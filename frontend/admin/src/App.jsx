import { ConfigProvider } from 'antd';
import esES from "antd/locale/es_ES";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './App.css';
import { useTheme } from './context/theme/useTheme';
import AppRouter from './router';

dayjs.locale("es");

const App = () => {
  const { algorithm } = useTheme();

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm,
        token: {
          colorPrimary: '#85CB33',
          headerBg: '#85CB33AA',
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
