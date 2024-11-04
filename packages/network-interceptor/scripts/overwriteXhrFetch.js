function __parseHeaders(rawHeaders) {
  const headers = {};
  rawHeaders
    .trim()
    .split(/[\r\n]+/)
    .forEach(line => {
      const parts = line.split(': ');
      const key = parts.shift();
      const value = parts.join(': ');
      headers[key] = value;
    });
  return headers;
}

function __postMessage(data) {
  window.postMessage(
    {
      source: 'extension/network-interceptor',
      ...data,
    },
    '*',
  );
}

(function (xhr) {
  var XHR = xhr.prototype;

  var open = XHR.open;
  var send = XHR.send;

  XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    return open.apply(this, arguments);
  };

  XHR.send = function (body) {
    this.addEventListener('load', function () {
      const parsedHeaders = __parseHeaders(this.getAllResponseHeaders());
      const responseHeaders = new Headers(parsedHeaders);
      const responseContentType = responseHeaders.get('Content-Type');

      let requestDataJson = body;
      let responseJson = this.response;

      if (responseContentType.includes('application/json')) {
        try {
          requestDataJson = JSON.parse(body);
          responseJson = JSON.parse(this.response);
        } catch {}
        const request = { method: this._method, url: this._url, data: requestDataJson };
        const response = { headers: parsedHeaders, data: responseJson };
        __postMessage({ type: 'xhr', request, response });
      }
    });
    return send.apply(this, arguments);
  };
})(window.XMLHttpRequest);

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const originResponse = await origFetch(...args);
  const responseClone = originResponse.clone();

  const responseHeaders = responseClone.headers;
  const responseContentType = responseHeaders.get('Content-Type');
  const responseHeadersJson = Object.fromEntries(responseHeaders.entries());

  if (responseContentType.includes('application/json')) {
    const [url, requestOptions] = args;
    const { data: requestData, method: requestMethod } = requestOptions;
    originResponse
      .clone()
      .json()
      .then(data => {
        const request = {
          method: requestMethod,
          url: url,
          data: requestData,
        };
        const response = { headers: responseHeadersJson, data };
        __postMessage({ type: 'fetch', request, response });
      });
  }
  return originResponse;
};
