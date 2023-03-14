import React, { useState, useEffect } from "react";
import { ChatReq, getChat, sendChat } from "@/apis/chat.api";

type Chat = {
  role: string;
  content: string;
};

const ChatPage = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([] as Chat[]);

  useEffect(() => {
    (async () => {
      const response = await getChat();
      const chatHistory = response.data?.result;
      if (chatHistory) setChatList(chatHistory);
    })();
  }, []);

  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const onSubmitChat = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const chatInput: Chat = {
        role: "user",
        content: inputText,
      };

      const newChatList = [...chatList, chatInput];
      setChatList(newChatList);

      const response = await sendChat({ role: chatInput.role, content: chatInput.content } as ChatReq);
      const chatResult = { role: "assistant", content: response.data.result } as Chat;

      setChatList([...newChatList, chatResult]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    setInputText("");
  };

  return (
    <div>
      {chatList.map((chat, index) => (
        <div key={index}>
          {chat.role === "assistant" ? <p>AI: {chat.content.trim()}</p> : <p>User: {chat.content}</p>}
        </div>
      ))}

      <form onSubmit={onSubmitChat}>
        <input type="text" value={inputText} onChange={onChangeInputText} />
        {isLoading && <p>Loading...</p>}
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default ChatPage;
