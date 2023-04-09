import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
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

  const queries = {
    chatList: useQuery("chatList", getChat, {
      onSuccess(response) {
        setChatList(response.data?.result);
      },
    }),
  }

  const mutations = {
    postChat: useMutation(postChat, {
      onSuccess: (response) => {
        const chatResult = { role: "assistant", content: response.data.result } as Chat;
        setChatList([...chatList, chatResult]);
      },
      onSettled: () => {
        setInputText("");
      }
    }),
    deleteChatAll: useMutation(deleteChatAll, {
      onSuccess: () => {
        setChatList([]);
      },
    }),
  }

  useEffect(() => {
    setIsLoading(queries.chatList.isLoading || mutations.postChat.isLoading || mutations.deleteChatAll.isLoading);
  }, [queries.chatList.isLoading, mutations.postChat.isLoading, mutations.deleteChatAll.isLoading]);

  const onChangeInputText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const onSubmitChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutations.postChat.mutate({ role: "user", content: inputText } as ChatReq);
  };

  const onClickDeleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    mutations.deleteChatAll.mutate({});
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
