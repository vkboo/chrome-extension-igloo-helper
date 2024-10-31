(function (xhr) {
  var XHR = xhr.prototype;

  var open = XHR.open;
  var send = XHR.send;

  XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    return open.apply(this, arguments);
  };

  XHR.send = function (postData) {
    // console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData);
    this.addEventListener('load', function () {
      // window.postMessage({ type: 'xhr', data: this.response }, '*');  // send to content script
      console.log('xhr response:', {
        response: this.response,
        reqUrl: this._url,
      });
    });
    return send.apply(this, arguments);
  };
})(window.XMLHttpRequest);

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);
  response
    .clone()
    .json() // maybe json(), text(), blob()
    .then(data => {
      console.log('fetch data', { data, req: args[0] });
      // window.postMessage({ type: 'fetch', data: data }, '*'); // send to content script
      //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
    })
    .catch(err => console.error(err));
  return response;
};
