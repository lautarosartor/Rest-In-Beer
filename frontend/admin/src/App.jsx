import { ConfigProvider } from 'antd';
import esES from "antd/locale/es_ES";
import ErrorBoundary from 'components/results/ErrorBoundary';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './App.css';
import { useTheme } from './context/theme/useTheme';
import AppRouter from './router';

dayjs.locale("es");

const App = () => {
  const { algorithm } = useTheme();

  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={esES}
        theme={{
          algorithm,
          token: {
            colorPrimary: '#85CB33',
            headerBg: '#85CB33AA',
          },
          components: {
            Modal: {
              titleLineHeight: 2,
            },
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
