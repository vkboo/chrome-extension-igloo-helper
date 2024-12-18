import type { Listener, MessageData } from './types';

const listeners: Listener[] = [];

export const response = {
  on: (descriptor: string, callback: Listener['callback']) => {
    const _descriptor = descriptor.trim().split(' ').reverse();
    const [url, method = 'GET'] = _descriptor as [string, Listener['method']];
    const id = Date.now().toString();
    listeners.push({ id, method, url, callback });
    // unsubscribe
    return () => {
      const delIndex = listeners.findIndex(e => e.id === id);
      listeners.splice(delIndex, 1);
    };
  },
};

window.addEventListener('message', (e: MessageEvent<MessageData>) => {
  if (e.data.source !== 'extension/network') return;
  const { type, request, response } = e.data;
  const responseHeaders = new Headers(response.headers ?? {});
  listeners.forEach(listener => {
    const { method, url, callback } = listener;
    if (method === request.method && request.url.endsWith(url)) {
      callback(request, { ...response, headers: responseHeaders }, { requestType: type });
    }
  });
});
