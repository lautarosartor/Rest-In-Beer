import React from "react";
import PropTypes from "prop-types";
import { Divider, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import CustomModal from "components/Modal";

const VerPedido = ({ pedido, closeModal }) => {

  return (
    <CustomModal
      isOpen={true}
      onClose={closeModal}
      title="Ver pedido"
      closeOnOverlayClick={true}
    >
      <UnorderedList>
        {pedido?.items?.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <div className="flex justify-between gap-4">
                <Text>{item.producto.nombre}</Text>
                <Text>${item.producto.precio} x{item.cantidad}</Text>
              </div>
            </ListItem>
            <Divider margin="1rem 0"/>
            {index === pedido.items.length - 1 && (
              <ListItem fontSize="xl" className="flex justify-between font-bold">
                <Text>Total:</Text>
                <Text>
                  $ {pedido.items.reduce((acc, item) => acc + item.subtotal, 0)}
                </Text>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </UnorderedList>
    </CustomModal>
  )
}

// Validacion de props
VerPedido.propTypes = {
  pedido: PropTypes.object,
  closeModal: PropTypes.func,
};

export default VerPedido;