import useMutation from "hooks/useMutation";
import { useParams } from "react-router-dom";
import { createSesion } from "routes/sesion/api";
import { showError, showNotification } from "utils";

const useSesion = (callback) => {
  const { qr } = useParams();

  const create = useMutation({
    mutationFn: createSesion,
    onSuccess: (res) => {
      showNotification({
        method: "success",
        title: res.message,
      });
      callback?.();
    },
    onError: (err) => showError({ err }),
  });

  const handleCreateSesion = () => {
    const payload = { codigo_qr: qr };
    create.mutate(payload);
  }

  return {
    handleCreateSesion,
    loadingCreate: create.loading,
  }
}

export default useSesion;