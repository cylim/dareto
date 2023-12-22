export const isURIEncoded = (uri: string) => {
  try {
    return uri !== decodeURIComponent(uri);
  } catch {
    return false;
  }
}

export const getEncodedURL = (url: string) => {
  return isURIEncoded(url) ? url : encodeURI(url);
}