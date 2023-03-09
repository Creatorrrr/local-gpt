import { useState } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async () => {
    setResponseText("submit!");
    alert("submit!");
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>{responseText}</div>
    </div>
  );
};

export default App;
