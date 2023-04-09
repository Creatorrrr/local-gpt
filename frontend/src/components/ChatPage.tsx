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
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div className="h-96 overflow-y-scroll mb-4 p-3">
            <div className="flex items-end mb-4">
              <div className="bg-green-200 p-3 rounded-lg rounded-br-none">
                <p>안녕하세요! 여기서 대화를 시작하세요.</p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <div className="bg-blue-200 p-3 rounded-lg rounded-bl-none">
                <p>안녕하세요! 반갑습니다.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input type="text" placeholder="메시지를 입력하세요..." className="w-full p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300" />
            <button className="bg-green-500 text-white px-4 py-3 rounded-r-lg">전송</button>
          </div>
        </div>
      </div>
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
