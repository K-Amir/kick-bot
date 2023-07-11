"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const channelId = "9830351";
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef(null);
  const [userColors, setUserColors] = useState({});
  const [userPic, setUserPic] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`https://kick.com/api/v2/channels/${channelId}/messages`)
        .then((res) => {
          const newMessages = res.data.data.messages;
          newMessages.reverse();

          newMessages.forEach(async (m) => {
            if (m.content.startsWith("!bg")) {
              setUserColors({
                ...userColors,
                [m.sender.username]: m.content.slice(4),
              });
            }

            if (m.content.startsWith("!pic")) {
              setUserPic({
                ...userPic,
                [m.sender.username]: m.content.slice(4),
              });
            }
          });

          setMessages(newMessages);
          scrollToBottom();
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center bg-none ">
      {messages.map((m, index) => {
        return (
          <div
            {...(index + 1 === messages.length && { ref: lastMessage })}
            className="my-4 w-max p-2 rounded relative bg-slate-700"
            style={{
              backgroundColor: userColors[m.sender.username],
            }}
            key={index}
          >
            <div className="w-8 h-8 absolute right-1 top-1 rounded overflow-hidden">
              <img
                src={
                  userPic[m.sender.username] ? userPic[m.sender.username] : ""
                }
              />
            </div>
            <div className="absolute -top-3 -left-0 font-bold bg-slate-200 text-black p-0.5 px-2 rounded text-xs">
              {m.sender.username}
            </div>
            <p className="w-40 max-w-full text-white text-md">{m.content}</p>
          </div>
        );
      })}
    </div>
  );
}
