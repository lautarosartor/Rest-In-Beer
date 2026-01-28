import { Box, IconButton, Input } from '@chakra-ui/react';
import { IoMdSend } from "react-icons/io";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { sendMessage } from './useSocket';

const Chat = ({ room, sender }) => {
  const now = new Date().toISOString();
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(
        room,
        {
          text: input,
          time: now,
          sender: sender,
        }
      );
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box textColor="#fff" w="100%">
      <Box display="flex" gap={4}>
        <Input
          w="100%"
          placeholder="Escribe un mensaje"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fontSize={15}
          bg="#2A3942"
          border="none"
          onKeyUp={handleKeyPress}
          _focusVisible={{outline: 'none'}}
        />
        <IconButton
          isRound={true}
          aria-label="Send"
          icon={<IoMdSend fontSize={25} />}
          color="#7C8B95"
          colorScheme="transparent"
          onClick={handleSendMessage}
        />
      </Box>
    </Box>
  );
};

// Validacion de props
Chat.propTypes = {
  room: PropTypes.any,
  sender: PropTypes.any,
};

export default Chat;
