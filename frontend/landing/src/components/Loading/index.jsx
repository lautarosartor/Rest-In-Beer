import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

const Loading = ({ height, fullscreen }) => {
  return (
    <div
      style={{
        height: height ? height : fullscreen ? "100vh" : "100%",
        width: fullscreen && "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        size='xl'
        speed='1s'
        color="#009C63"
      />
    </div>
  );
}

// Validacion de props
Loading.propTypes = {
  height: PropTypes.any,
  fullscreen: PropTypes.any,
};

export default Loading;