import { ConfigProvider } from 'antd';
import './App.css';
import { useTheme } from './context/theme/useTheme';
import AppRouter from './router';

const App = () => {
  const { algorithm } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#59c99e',
          headerBg: '#59c99e',
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
