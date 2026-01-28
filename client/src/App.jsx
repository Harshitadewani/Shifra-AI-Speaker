import React, { useContext } from "react";
import "./App.css";
import va from "./assets/r2.png";
import { CiMicrophoneOff } from "react-icons/ci";
import { DataContext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

const App = () => {
  const {
    recognition,
    speaking,
    setspeaking,
    prompt,
    response,
    setPrompt,
    setResponse,
  } = useContext(DataContext);

  return (
    <div className="main">
      <img src={va} alt="ai" id="shifra" />

      <span>I am Shifra, Your Advance Virtual Assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("Listening...");
            setspeaking(true);     // ✅ image show hogi
            setResponse(false);

            if (recognition) {
              recognition.start();
            }
          }}
        >
          Click here <CiMicrophoneOff />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakimg} alt="listening" id="speak" />
          ) : (
            <img src={aigif} alt="ai speaking" id="aigif" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;