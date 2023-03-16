import React, { useState, useEffect } from "react";
import { ChatReq, deleteChatAll, getChat, postChat } from "@/apis/chat.api";

console.debug("ChatPage.tsx");

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

  const onChangeInputText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

      const response = await postChat({ role: chatInput.role, content: chatInput.content } as ChatReq);
      const chatResult = { role: "assistant", content: response.data.result } as Chat;

      setChatList([...newChatList, chatResult]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    setInputText("");
  };

  const onClickDeleteAll = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await deleteChatAll();

      setChatList([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {chatList.map((chat, index) => (
        <div key={index}>
          {chat.role === "assistant" ? <p>AI: {chat.content.trim()}</p> : <p>User: {chat.content}</p>}
        </div>
      ))}
      <form onSubmit={onSubmitChat}>
        <textarea value={inputText} onChange={onChangeInputText} />
        {isLoading && <p>Loading...</p>}
        <button type="submit">전송</button>
      </form>
      <button type="button" onClick={onClickDeleteAll}>
        대화내용 전체 삭제
      </button>
    </div>
  );
};

export default ChatPage;
