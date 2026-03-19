import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { sendMessage } from "./useSocket";

const Chat = ({ room, sender }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessage(room, {
      text: input,
      time: new Date().toISOString(),
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
    <div style={{ width: "100%", color: "#fff" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Escribe un mensaje"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyPress}
          style={{
            background: "#2A3942",
            border: "none",
            color: "#fff",
            fontSize: 15,
          }}
          className="chat-input"
        />

        <Button
          type="text"
          shape="circle"
          icon={<SendOutlined style={{ fontSize: 22 }} />}
          onClick={handleSendMessage}
          style={{
            color: "#7C8B95",
          }}
        />
      </div>
    </div>
  );
};

export default Chat;