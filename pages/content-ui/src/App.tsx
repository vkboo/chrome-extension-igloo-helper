import { AccessPage } from './components';
import { AuthCenterV1, Dashboard } from './sites';
import { AUTH_CENTER_MATCHES, DASHBOARD_MATCHES } from '@extension/shared';

export default function App() {
  return (
    <>
      <AccessPage matches={AUTH_CENTER_MATCHES}>
        <AuthCenterV1 />
      </AccessPage>

      <AccessPage matches={DASHBOARD_MATCHES}>
        <Dashboard />
      </AccessPage>
    </>
  );
}
