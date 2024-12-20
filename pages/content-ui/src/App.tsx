import { AccessPage } from './components';
import { AuthCenterV1, Dashboard } from './sites';
import { AUTH_CENTER_MATCHES, DASHBOARD_MATCHES, RequestProvider } from '@extension/shared';

export default function App() {
  return (
    <>
      <AccessPage matches={AUTH_CENTER_MATCHES}>
        <RequestProvider
          value={{
            tokenKey: 'x-axinan-authorization',
            tokenLocalStorageKey: 'token',
          }}>
          <AuthCenterV1 />
        </RequestProvider>
      </AccessPage>

      <AccessPage matches={DASHBOARD_MATCHES}>
        <Dashboard />
      </AccessPage>
    </>
  );
}
