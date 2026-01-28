import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomDrawer = ({
  isOpen,
  onClose,
  size = "sm",
  placement = "right",
  title,
  children,
  onOk,
  okText = "Guardar",
  closeText = "Cerrar",
  confirmLoading = false,
  closeOnOverlayClick = false,
  closeOnEsc = false,
  ...rest
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement={placement}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading size="lg">{title}</Heading>
        </DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        <DrawerFooter gap={4}>
          <Button variant="outline" onClick={onClose}>
            {closeText}
          </Button>

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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Validacion de props
CustomDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  closeText: PropTypes.string,
  confirmLoading: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
};

export default CustomDrawer;
