import { Flex, Spin } from "antd";

const Loading = ({ height, fullscreen = true }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: height ? height : fullscreen ? "100vh" : "100%",
        width: fullscreen ? "100%" : "100%",
      }}
    >
      <Spin />
    </Flex>
  )
}

export default Loading;