function toURL(str) {
  // decode, then encode str
  str = encodeURIComponent(decodeURIComponent(str));

  // replace all encoded spaces, or encoded +'s with normal +'s
  return str.replace(/(%20|%2B|\s)/g, '+');
}

function fromURL(str) {
  str = decodeURIComponent(str);

  return str.replace(/\+/g, ' ');
}

export {
  toURL,
  fromURL,
};
