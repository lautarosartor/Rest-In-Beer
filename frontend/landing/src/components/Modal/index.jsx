import PropTypes from "prop-types";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const CustomModal = ({
  isOpen,
  onClose,
  size = "md",
  title,
  children,
  onOk,
  okText = "Guardar",
  closeText = "Cerrar",
  confirmLoading = false,
  as,
  closeOnOverlayClick = false,
  ...rest
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={closeOnOverlayClick}
      {...rest}
    >
      <ModalOverlay />

      <ModalContent
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 100 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {title && (
          <ModalHeader>
            <Heading size="lg">{title}</Heading>
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody fontSize="md" as={as && as}>
          {children}
        </ModalBody>

        <ModalFooter gap={4}>
          <Button onClick={onClose}>{closeText}</Button>

          {onOk && (
            <Button
              colorScheme="blue"
              onClick={() => {
                onOk();
              }}
              isLoading={confirmLoading}
            >
              {okText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Validacion de props
CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  closeText: PropTypes.string,
  confirmLoading: PropTypes.bool,
  as: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
};

export default CustomModal;
