import useMutation from "hooks/useMutation";
import { useState } from "react";
import { ulid } from "ulid";
import { showError, showNotification } from "utils";
import { createPedido } from "./api";

const usePedidos = (callback, sesionID) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidad, setCantidad] = useState({});

  const create = useMutation({
    idempotency: true,
    mutationFn: createPedido,
    onSuccess: (res) => {
      showNotification({ res });
      callback?.();
    },
    onError: (err) => showError({ err }),
  });

  const handleAgregarProducto = (producto) => {
    // Si ya está en el carrito no lo agregues de nuevo
    if (cantidad[producto?.id] !== undefined) return;

    setProductosCarrito((prev) => [...prev, producto]);
    setCantidad((prev) => ({ ...prev, [producto.id]: 1 }));
  };

  const aumentarCantidad = (id) => {
    setCantidad((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const disminuirCantidad = (id) => {
    setCantidad((prev) => {
      const nueva = prev[id] - 1;
      if (nueva <= 0) {
        // elimina del carrito
        const { [id]: _, ...resto } = prev;
        setProductosCarrito((p) => p.filter((item) => item.id !== id));
        return resto;
      }
      return { ...prev, [id]: nueva };
    });
  };

  const eliminarProducto = (id) => {
    setProductosCarrito((prev) => prev.filter((item) => item.id !== id));
    setCantidad((prev) => {
      const { [id]: _, ...resto } = prev;
      return resto;
    });
  };

  const handlePedir = () => {
    if (!Object.values(cantidad).some((v) => v > 0)) {
      return showNotification({ msg: "Debe seleccionar al menos un producto." });
    }

    const items = Object.entries(cantidad)
      .filter(([, c]) => c > 0)
      .map(([idproducto, c]) => ({
        idproducto: Number(idproducto),
        cantidad: c,
      }));

    const payload = {
      ...items,
      sesion_id: sesionID,
    };
    console.log(payload, ulid())
    // create.mutate(payload);
  };

  return {
    loading: create.loading,
    productosCarrito,
    cantidad,
    handleAgregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    handlePedir,
  }
}

export default usePedidos;