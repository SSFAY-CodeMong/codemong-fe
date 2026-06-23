function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

function isMarkdownLine(line) {
  const trimmed = line.trim()
  return !trimmed ||
    trimmed.startsWith('```') ||
    trimmed === '<details>' ||
    trimmed === '</details>' ||
    /^<summary>.*<\/summary>$/.test(trimmed) ||
    /^#{1,6}\s+/.test(trimmed) ||
    /^[-*]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed)
}

function isCodeLikeLine(line) {
  const trimmed = line.trim()
  if (!trimmed || isMarkdownLine(line)) return false

  if (/^\s{2,}\S/.test(line)) return true
  if (/^(import|export|package|class|interface|enum|public|private|protected|static|fun|function|const|let|var|return|if|else|for|while|switch|case|try|catch|finally|throw|new|def|from|SELECT|INSERT|UPDATE|DELETE)\b/.test(trimmed)) return true
  if (/^(@\w+|\/\/|\/\*|\*\/|#include\b|#[a-z]+\b)/.test(trimmed)) return true
  if (/<\/?[A-Za-z][^>]*>/.test(trimmed)) return true
  if (/[{};]$/.test(trimmed)) return true
  if (/(=>|===|!==|==|!=|<=|>=|\+\+|--)/.test(trimmed)) return true
  if (/^[A-Za-z_$][\w$]*(\.[\w$]+)*\s*[:=]\s*['"`[{(0-9]/.test(trimmed)) return true
  if (/^[A-Za-z_$][\w$]*(\.[\w$]+)*\([^)]*\)\s*[{:;]/.test(trimmed)) return true

  return false
}

function shouldFenceCodeCandidate(lines) {
  const nonEmptyLines = lines.filter(line => line.trim())
  if (nonEmptyLines.length < 2) return false

  const codeLineCount = nonEmptyLines.filter(isCodeLikeLine).length
  if (codeLineCount >= 2) return true

  return nonEmptyLines.some(line => /^\s{2,}\S/.test(line))
}

function autoFenceCodeBlocks(markdown) {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n')
  const result = []
  let candidate = []
  let inFence = false

  const flushCandidate = () => {
    if (!candidate.length) return

    if (shouldFenceCodeCandidate(candidate)) {
      result.push('```', ...candidate, '```')
    } else {
      result.push(...candidate)
    }
    candidate = []
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      flushCandidate()
      inFence = !inFence
      result.push(line)
      return
    }

    if (inFence) {
      result.push(line)
      return
    }

    if (isCodeLikeLine(line) || (candidate.length && !trimmed)) {
      candidate.push(line)
      return
    }

    flushCandidate()
    result.push(line)
  })

  flushCandidate()
  return result.join('\n')
}

export function renderMarkdown(markdown) {
  if (!markdown) return ''

  const lines = autoFenceCodeBlocks(markdown).split('\n')
  const html = []
  let inCode = false
  let codeLines = []
  let listType = ''

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`)
      listType = ''
    }
  }

  const openList = (nextType, startNumber = null) => {
    if (listType === nextType) return
    closeList()
    if (nextType === 'ol' && startNumber && startNumber > 1) {
      html.push(`<ol start="${startNumber}">`)
    } else {
      html.push(`<${nextType}>`)
    }
    listType = nextType
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
        codeLines = []
        inCode = false
      } else {
        closeList()
        inCode = true
      }
      return
    }

    if (inCode) {
      codeLines.push(line)
      return
    }

    if (!trimmed) {
      closeList()
      return
    }

    if (trimmed === '<details>' || trimmed === '</details>') {
      closeList()
      html.push(trimmed)
      return
    }

    const summary = trimmed.match(/^<summary>(.*)<\/summary>$/)
    if (summary) {
      closeList()
      html.push(`<summary>${renderInline(summary[1])}</summary>`)
      return
    }

    if (trimmed.startsWith('### ')) {
      closeList()
      html.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`)
      return
    }

    if (trimmed.startsWith('## ')) {
      closeList()
      html.push(`<h2>${renderInline(trimmed.slice(3))}</h2>`)
      return
    }

    if (trimmed.startsWith('# ')) {
      closeList()
      html.push(`<h1>${renderInline(trimmed.slice(2))}</h1>`)
      return
    }

    const ordered = trimmed.match(/^(\d+)\.\s+(.+)$/)
    if (ordered) {
      openList('ol', Number(ordered[1]))
      html.push(`<li>${renderInline(ordered[2])}</li>`)
      return
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      openList('ul')
      html.push(`<li>${renderInline(unordered[1])}</li>`)
      return
    }

    closeList()
    html.push(`<p>${renderInline(line)}</p>`)
  })

  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
  }
  closeList()
  return html.join('')
}

export { escapeHtml }
