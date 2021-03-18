function parseHash(hash = "") {
  let params = hash.replace(/#/, "");
  params = params.split("&");
  params = params.reduce((result, param) => {
    const [key, value] = param.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value);
    return result;
  }, {});

  return params;
}

export default parseHash;
