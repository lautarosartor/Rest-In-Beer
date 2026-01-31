import { Spin } from "antd";

const Loading = ({ height, fullscreen = true }) => {
  return (
    <div
      style={{
        height: height ? height : fullscreen ? "100vh" : "100%",
        width: fullscreen ? "100%" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spin />
    </div>
  )
}

export default Loading;