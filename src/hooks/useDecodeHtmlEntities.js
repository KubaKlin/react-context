const useDecodeHtmlEntities = (string) => {
  if (!string) {
    return '';
  }
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&rsquo;': '’',
    '&lsquo;': '‘',
    '&ldquo;': '“',
    '&rdquo;': '”',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
  };
  return string.replace(
    /&[a-zA-Z0-9#]+;/g,
    (entity) => entityMap[entity] || entity,
  );
};

export default useDecodeHtmlEntities;
