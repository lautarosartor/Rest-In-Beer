import useMutation from "hooks/useMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "services/api";
import { getToken, showError } from "utils";

const useLogin = () => {
  const navigate = useNavigate();

  const loagearse = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", res?.data?.token);
      navigate("/");
    },
    onError: (err) => showError({ err }),
  });

  const handleLogin = (values) => {
    const payload = {
      email: values?.email,
      password: values?.password,
    }
    loagearse.mutate(payload);
  }

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, []);

  return {
    loading: loagearse.loading,
    handleLogin,
  }
}

export default useLogin;