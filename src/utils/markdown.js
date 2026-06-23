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

export function renderMarkdown(markdown) {
  if (!markdown) return ''

  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n')
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
