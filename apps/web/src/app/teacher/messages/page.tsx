
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  MessageCircle,
  CheckCheck,
  Image as ImageIcon,
  Smile,
  ArrowLeft,
  Users,
} from "lucide-react";

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "student";
};

type Conversation = {
  id: number;
  name: string;
  initials: string;
  course: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    course: "Full Stack Web Development",
    lastMessage: "Thank you for explaining the React concept!",
    time: "10:42 AM",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        text: "Hello sir, I have a question about React hooks.",
        time: "10:30 AM",
        sender: "student",
      },
      {
        id: 2,
        text: "Sure! What would you like to know?",
        time: "10:34 AM",
        sender: "me",
      },
      {
        id: 3,
        text: "I am confused about the useEffect dependency array.",
        time: "10:38 AM",
        sender: "student",
      },
      {
        id: 4,
        text: "The dependency array controls when the effect runs. I will explain it in the next class too.",
        time: "10:40 AM",
        sender: "me",
      },
      {
        id: 5,
        text: "Thank you for explaining the React concept!",
        time: "10:42 AM",
        sender: "student",
      },
    ],
  },
  {
    id: 2,
    name: "Priya Reddy",
    initials: "PR",
    course: "UI/UX Design Fundamentals",
    lastMessage: "Can you review my latest design?",
    time: "09:25 AM",
    unread: 1,
    online: true,
    messages: [
      {
        id: 1,
        text: "Good morning! I completed my design assignment.",
        time: "09:20 AM",
        sender: "student",
      },
      {
        id: 2,
        text: "Great work! Please share the design.",
        time: "09:22 AM",
        sender: "me",
      },
      {
        id: 3,
        text: "Can you review my latest design?",
        time: "09:25 AM",
        sender: "student",
      },
    ],
  },
  {
    id: 3,
    name: "Rahul Kumar",
    initials: "RK",
    course: "Advanced React Development",
    lastMessage: "I submitted the assignment.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "Sir, I have submitted the React assignment.",
        time: "Yesterday",
        sender: "student",
      },
      {
        id: 2,
        text: "Thank you. I will review it.",
        time: "Yesterday",
        sender: "me",
      },
    ],
  },
  {
    id: 4,
    name: "Sneha Patel",
    initials: "SP",
    course: "Full Stack Web Development",
    lastMessage: "When is our next live class?",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "When is our next live class?",
        time: "Yesterday",
        sender: "student",
      },
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    initials: "VS",
    course: "Database Management",
    lastMessage: "Understood, thank you!",
    time: "Mon",
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        text: "I understood the database normalization topic now.",
        time: "Mon",
        sender: "student",
      },
      {
        id: 2,
        text: "Excellent! Keep practicing.",
        time: "Mon",
        sender: "me",
      },
    ],
  },
];

export default function TeacherMessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [showMobileChat, setShowMobileChat] = useState(false);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.course}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [conversations, search]);

  const unreadCount = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0
  );

  function openConversation(id: number) {
    setSelectedId(id);
    setShowMobileChat(true);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function sendMessage() {
    if (!message.trim() || !selectedId) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              lastMessage: newMessage.text,
              time: newMessage.time,
            }
          : conversation
      )
    );

    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Teacher Workspace
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Messages
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Communicate with your students and answer their questions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <MessageCircle size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {unreadCount} Unread Messages
            </span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="grid h-[720px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[320px_1fr]">

          {/* Conversation Sidebar */}
          <aside
            className={`flex min-h-0 flex-col border-r border-slate-200 ${
              showMobileChat ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Conversations
                </h2>
                <Users size={19} className="text-slate-400" />
              </div>

              <div className="relative mt-4">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search students..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <p className="p-5 text-center text-sm text-slate-500">
                  No conversations found.
                </p>
              ) : (
                filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => openConversation(conversation.id)}
                    className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                      selectedId === conversation.id
                        ? "bg-blue-50"
                        : "bg-white"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {conversation.initials}
                      </div>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {conversation.name}
                        </h3>
                        <span className="shrink-0 text-[11px] text-slate-400">
                          {conversation.time}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {conversation.course}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-slate-500">
                          {conversation.lastMessage}
                        </p>

                        {conversation.unread > 0 && (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Chat Window */}
          <section
            className={`min-h-0 flex-col ${
              showMobileChat ? "flex" : "hidden md:flex"
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 md:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowMobileChat(false)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
                      aria-label="Back to conversations"
                    >
                      <ArrowLeft size={19} />
                    </button>

                    <div className="relative shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {selectedConversation.initials}
                      </div>
                      {selectedConversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-slate-900">
                        {selectedConversation.name}
                      </h2>
                      <p className="truncate text-xs text-slate-500">
                        {selectedConversation.online ? "Online" : "Offline"} ·{" "}
                        {selectedConversation.course}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 text-slate-500">
                    <button
                      type="button"
                      aria-label="Call student"
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Phone size={19} />
                    </button>
                    <button
                      type="button"
                      aria-label="Video call"
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Video size={19} />
                    </button>
                    <button
                      type="button"
                      aria-label="More conversation options"
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <MoreVertical size={19} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 md:p-6">
                  <div className="text-center">
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 shadow-sm">
                      Conversation
                    </span>
                  </div>

                  {selectedConversation.messages.map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%] ${
                          item.sender === "me"
                            ? "rounded-br-sm bg-blue-600 text-white"
                            : "rounded-bl-sm border border-slate-100 bg-white text-slate-800"
                        }`}
                      >
                        <p className="text-sm leading-6">{item.text}</p>

                        <div
                          className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${
                            item.sender === "me"
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          {item.time}
                          {item.sender === "me" && (
                            <CheckCheck size={13} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-slate-100 bg-white p-4 md:p-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      aria-label="Attach file"
                      className="hidden rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 sm:block"
                    >
                      <Paperclip size={20} />
                    </button>

                    <button
                      type="button"
                      aria-label="Attach image"
                      className="hidden rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 sm:block"
                    >
                      <ImageIcon size={20} />
                    </button>

                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                    />

                    <button
                      type="button"
                      aria-label="Emoji"
                      className="hidden rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 sm:block"
                    >
                      <Smile size={20} />
                    </button>

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <Send size={18} />
                    </button>
                  </form>

                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    Messages shown here are demo data and are not saved to the server.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="rounded-2xl bg-blue-50 p-5 text-blue-600">
                  <MessageCircle size={36} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Your Messages
                </h3>
                <p className="mt-2 max-w-xs text-sm text-slate-500">
                  Select a student from your conversations to start chatting.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
