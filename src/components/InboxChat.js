import "../styles/InboxChat.css";
import cat from "../images/cat.jpg";
import chatEmoji from "../images/chat-emoji.svg";
import InboxChatMessage from "./InboxChatMessage";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

let selectionStart;

function InboxChat() {
  const [inputValue, setInputValue] = useState("");
  const [emojiPickerShown, setEmojiPickerShown] = useState(false);
  const messageInput = useRef(null);
  const emojiToggle = useRef(null);

  useEffect(() => {
    emojiToggle.current.addEventListener("click", () => {
      setEmojiPickerShown((prevEmojiPickerShown) => !prevEmojiPickerShown);
    });
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    selectionStart = messageInput.current.selectionStart;
    messageInput.current.focus();
    setEmojiPickerShown(false);
    setInputValue((prevInputValue) => {
      return (
        prevInputValue.slice(0, selectionStart) +
        emojiObject.emoji +
        prevInputValue.slice(selectionStart)
      );
    });
  };

  function handleMessageInputChanged(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="inbox-chat">
      <div className="inbox-chat-header">
        <img className="inbox-chat-header-img" src={cat} alt="" />
        <div className="inbox-chat-header-username">
          <span>stc.official</span>
        </div>
      </div>
      <div className="inbox-chat-messages">
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"contact"} />
        <InboxChatMessage sender={"me"} />
        <InboxChatMessage sender={"me"} />
      </div>
      <div className="inbox-chat-message-bar">
        <div className="inbox-chat-message-input-container">
          {emojiPickerShown ? (
            <>
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{
                  position: "absolute",
                  bottom: "90px",
                  zIndex: "1",
                }}
              />
              <div
                className="emoji-picker-wrapper"
                onClick={() => {
                  setEmojiPickerShown(false);
                }}
              ></div>
            </>
          ) : null}
          <img
            className="inbox-chat-messsage-bar-emoji"
            src={chatEmoji}
            alt=""
            ref={emojiToggle}
          />
          <input
            className="inbox-chat-message-input"
            type="text"
            placeholder="Message..."
            onChange={(e) => handleMessageInputChanged(e)}
            value={inputValue}
            ref={messageInput}
          />
          {inputValue === "" ? (
            <button className="inbox-chat-message-send-btn disabled" disabled>
              Send
            </button>
          ) : (
            <button className="inbox-chat-message-send-btn">Send</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxChat;
