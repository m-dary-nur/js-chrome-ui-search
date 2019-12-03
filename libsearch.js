function escapeChars(text) {
	return text.replace(/([.*+?^=!:${}()|\\[\\])/g, '\\$1')
}

function wrapper(text, query) {
	let lastIndex = 0
	const words = query
		.split(/\s+/)
		.filter(word => word.length > 0)
        .map(escapeChars)
	if (words.length === 0) {
		return [text]
	}
	const regexp = new RegExp(words.join('|'), 'gi')
	const tokens = []
	while (true) {
		const match = regexp.exec(text)
		if (!match) {
			break
		}
		const length = match[0].length
		const before = text.slice(lastIndex, regexp.lastIndex - length)
		if (before.length > 0) {
			tokens.push(before)
		}
        lastIndex = regexp.lastIndex
        /* this is element for found ex: add style in jsx */
		tokens.push(
			<strong key={lastIndex} style={{color: 'red' }}>
				{match[0]}
			</strong>
		)
	}
	const rest = text.slice(lastIndex)
	if (rest.length > 0) {
		tokens.push(rest)
	}
	return tokens
}