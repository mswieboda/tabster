function toURL(url) {
  // replace spaces with +, replace ? with %3F
  return url
    .replace(/\s/g, '+')
    .replace(/\?/g, "%3F");
}

function fromURL(url) {
  // replace + with spaces, replace %3F with ?
  return url
    .replace(/\+/g, ' ')
    .replace(/(%3F)/g, '?');
}

export {
  toURL,
  fromURL,
};
