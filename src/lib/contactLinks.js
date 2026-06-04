export function getEmailAddress(value) {
  return String(value || '')
    .trim()
    .replace(/^mailto:/i, '')
    .replace(/\s+/g, '')
}

export function getMailtoLink(value, subject = '') {
  const email = getEmailAddress(value)
  if (!email) return ''

  const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${email}${query}`
}
