import * as React from 'react';
import type { ContextValues } from './types';
import { useWebsiteLocation } from '../../hooks';
import { request as httpRequest } from '@extension/network';
import type { Request } from '@extension/network';

const RequestContext = React.createContext<ContextValues | null>(null);

const useHeaders = (http: ContextValues) => {
  const { tokenKey, tokenLocalStorageKey } = http;
  const token = localStorage.getItem(tokenLocalStorageKey);
  return {
    [tokenKey]: token,
  };
};

const useBaseUrl = () => {
  const { href } = useWebsiteLocation();
  if (href.includes('.dev.')) {
    return 'https://api.qa.iglooinsure.com';
  }
  if (href.includes('.qa.')) {
    return 'https://api.qa.iglooinsure.com';
  }
  if (href.includes('.staging.')) {
    return 'https://api.staging.iglooinsure.com';
  }
  if (href.includes('.demo.')) {
    return 'https://api.demo.iglooinsure.com';
  }
  return 'https://api.iglooinsure.com';
};

export const RequestProvider = RequestContext.Provider;

export const useRequest = () => {
  const contextData = React.useContext(RequestContext);
  if (!contextData) {
    throw new Error('useRequest must be used within a Provider');
  }
  const headers = useHeaders(contextData);
  const baseURL = useBaseUrl();
  const request = React.useMemo(
    () =>
      httpRequest.create({
        baseURL,
        headers,
      }),
    [baseURL, headers],
  );
  request.interceptors.response.use(raw => raw.data);
  return request as Request;
};
