// React 라이브러리를 사용하여 채팅 화면을 개발합니다.
import React, { useState } from "react";
import axios from "axios";

function App() {
  // inputText는 사용자가 입력한 내용을 저장하는 상태 변수입니다.
  const [inputText, setInputText] = useState("");

  // isLoading은 요청이 보내지는 동안 로딩 표시를 보여주기 위한 상태 변수입니다.
  const [isLoading, setIsLoading] = useState(false);

  // chatList는 대화 내용을 저장하는 상태 변수입니다.
  const [chatList, setChatList] = useState([]);

  // handleInputChange 함수는 inputText 상태 변수를 업데이트합니다.
  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  // handleSubmit 함수는 사용자가 입력한 내용을 서버로 전송합니다.
  async function handleSubmit(event) {
    event.preventDefault();

    // 요청이 보내지는 동안 로딩 표시를 보여줍니다.
    setIsLoading(true);

    try {
      // axios 라이브러리를 사용하여 POST 요청을 보냅니다.
      const response = await axios.post("localhost:8080/chats", {
        role: "user",
        content: inputText,
      });

      // 서버로부터 전달받은 대화 내용을 chatList 상태 변수에 추가합니다.
      setChatList([...chatList, response.data.result]);

      // 요청이 완료되었으므로 로딩 표시를 숨깁니다.
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      // 요청이 실패하였으므로 로딩 표시를 숨깁니다.
      setIsLoading(false);
    }

    // 사용자가 입력한 내용을 초기화합니다.
    setInputText("");
  }

  return (
    <div>
      {/* 대화 내용을 표시하는 부분입니다. */}
      {chatList.map((chat, index) => (
        <div key={index}>{chat.role === "system" ? <p>시스템: {chat.content}</p> : <p>사용자: {chat.content}</p>}</div>
      ))}

      {/* 사용자가 입력한 내용을 입력하는 부분입니다. */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />

        {/* 요청이 보내지는 동안 로딩 표시를 보여줍니다. */}
        {isLoading && <p>Loading...</p>}

        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default App;
