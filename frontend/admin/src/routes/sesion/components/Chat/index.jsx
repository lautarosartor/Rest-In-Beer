import { SendOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { sendMessage } from "./useSocket";

const Chat = ({ room, sender }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessage(room, {
      text: input,
      time: dayjs().toISOString(),
      // time: new Date().toISOString(),
      sender,
    });

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Flex
      align="center"
      gap={16}
      style={{
        width: "100%",
        color: "#fff"
      }}
    >
      <Input
        placeholder="Escribe un mensaje"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleKeyPress}
        className="chat-input"
        style={{
          background: "#2A3942",
          border: "none",
          color: "#fff",
          fontSize: 14,
        }}
      />

      <Button
        type="text"
        shape="circle"
        icon={<SendOutlined />}
        onClick={handleSendMessage}
        style={{
          color: input.trim() !== "" ? "" : "#7C8B95"
        }}
      />
    </Flex>
  );
};

export default Chat;