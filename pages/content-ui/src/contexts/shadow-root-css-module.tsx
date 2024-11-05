import { createContext, useContext, useEffect } from 'react';

type ShadowRootCSSModuleContextType = {
  shadowRoot: ShadowRoot;
};

export const ShadowRootCSSModuleContext = createContext<ShadowRootCSSModuleContextType | null>(null);

const useContextData = () => {
  const object = useContext(ShadowRootCSSModuleContext);
  if (!object) {
    throw new Error('useContextData must be used within a Provider');
  }
  return object;
};

export const useShadowRootCSSModule = (cssInline: string) => {
  const { shadowRoot } = useContextData();
  const moduleStyleSheet = new CSSStyleSheet();
  moduleStyleSheet.replaceSync(cssInline);
  shadowRoot.adoptedStyleSheets.push(moduleStyleSheet);
  useEffect(() => {
    return () => {
      shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter(sheet => sheet !== moduleStyleSheet);
    };
  });
};
