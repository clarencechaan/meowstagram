/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/InboxChat.css";
import chatEmoji from "../images/chat-emoji.svg";
import InboxChatMessage from "./InboxChatMessage";
import { useEffect, useRef, useState } from "react";
import {
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase";
import Picker from "emoji-picker-react";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import convertLinks from "../scripts/convertLinks";

const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const getTimeStamp = httpsCallable(functions, "getTimeStamp");

let selectionStart;

function InboxChat({ me, contactSelected, postID }) {
  const emptyChat = { messages: [], timestamp: 0 };
  const [inputValue, setInputValue] = useState("");
  const [emojiPickerShown, setEmojiPickerShown] = useState(false);
  const [chat, setChat] = useState(emptyChat);
  const messageInput = useRef(null);
  const emojiToggle = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    emojiToggle.current.addEventListener("click", () => {
      setEmojiPickerShown((prevEmojiPickerShown) => !prevEmojiPickerShown);
    });
    fetchChat();
    const unsub = onSnapshot(doc(db, "chats", getChatID()), (doc) => {
      if (doc.data()) setChat(doc.data());
      scrollToBottom();
    });

    if (postID) sharePost();

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    fetchChat();
  }, [contactSelected]);

  async function fetchChat() {
    const chatRef = doc(db, "chats", getChatID());
    const chatSnap = await getDoc(chatRef);
    if (chatSnap.data()) {
      setChat(chatSnap.data());
      scrollToBottom(true);
    } else {
      await setDoc(chatRef, emptyChat);
      setChat(emptyChat);
    }
  }

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

  async function uploadMessage(message) {
    const chatRef = doc(db, "chats", getChatID());
    await updateDoc(chatRef, {
      messages: arrayUnion(message),
      timestamp: await getTimeStamp(),
    });
  }

  function getChatID() {
    if (me.username < contactSelected.username) {
      return me.username + "-" + contactSelected.username;
    } else {
      return contactSelected.username + "-" + me.username;
    }
  }

  function handleSendBtnClicked(text) {
    let textContent = text ? text : inputValue;
    textContent = convertLinks(textContent);
    const newMessage = {
      sender: me.username,
      text: textContent,
      id: nanoid(),
    };
    uploadMessage(newMessage);
    setChat((prevChat) => ({
      messages: [...prevChat.messages, newMessage],
      timestamp: getTimeStamp(),
    }));
    setInputValue("");
    scrollToBottom();
  }

  function scrollToBottom(isInstant) {
    if (isInstant) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView(), 1);
    } else {
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        1
      );
    }
  }

  function sharePost() {
    const postURL = window.location.origin + "/post/" + postID;
    const sharePostMessage = "Check out this post! " + postURL;
    handleSendBtnClicked(sharePostMessage);
    window.history.replaceState(null, "");
  }

  return (
    <div className="inbox-chat">
      <div className="inbox-chat-header">
        <Link to={"/profile/" + contactSelected.username}>
          <img
            className="inbox-chat-header-img"
            src={contactSelected.imgURL}
            alt=""
          />
        </Link>
        <div className="inbox-chat-header-username">
          <Link to={"/profile/" + contactSelected.username}>
            <span>{contactSelected.username}</span>
          </Link>
        </div>
      </div>
      <div className="inbox-chat-messages">
        {chat.messages.map((message) => (
          <InboxChatMessage
            me={me}
            sender={message.sender}
            text={message.text}
            key={message.id}
          />
        ))}
        <div ref={messagesEndRef} />
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
          <form action="#">
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
              <button
                className="inbox-chat-message-send-btn"
                onClick={() => handleSendBtnClicked()}
              >
                Send
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default InboxChat;
