type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Request = {
  method: Method;
  url: string;
  data?: object;
};

type Response = {
  data: any;
  headers: Headers;
};

type Meta = Record<string, any>;

export type Listener = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  callback: (request: Request, response: Response, meta: Meta) => void;
};

export type MessageData = {
  source: 'extension/network-interceptor';
  type: 'fetch' | 'xhr';
  request: Request;
  response: Omit<Response, 'headers'> & {
    headers: Record<string, string>;
  };
};
