
"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Send,
  MessageSquare,
  Video,
  Phone,
  Info,
  MoreVertical,
  ArrowLeft,
  Circle,
  GraduationCap,
  CheckCheck,
} from "lucide-react";

/* -------------------- Types -------------------- */

type Message = {
  id: number;
  sender: "me" | "lecturer";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  role: string;
  course: string;
  initials: string;
  color: string;
  online: boolean;
  unread: number;
};

/* -------------------- Lecturer Contacts -------------------- */

const conversations: Conversation[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Web Development Lecturer",
    course: "Advanced React Development",
    initials: "JS",
    color: "bg-blue-600",
    online: true,
    unread: 2,
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "UI/UX Design Lecturer",
    course: "UI/UX Design Fundamentals",
    initials: "JC",
    color: "bg-purple-600",
    online: true,
    unread: 0,
  },
  {
    id: 3,
    name: "Robert Fox",
    role: "Python Lecturer",
    course: "Python Programming",
    initials: "RF",
    color: "bg-emerald-600",
    online: false,
    unread: 0,
  },
  {
    id: 4,
    name: "Albert Flores",
    role: "Marketing Lecturer",
    course: "Digital Marketing Strategy",
    initials: "AF",
    color: "bg-orange-600",
    online: true,
    unread: 1,
  },
  {
    id: 5,
    name: "Kristin Watson",
    role: "JavaScript Lecturer",
    course: "JavaScript Fundamentals",
    initials: "KW",
    color: "bg-pink-600",
    online: false,
    unread: 0,
  },
];

/* -------------------- Sample Messages -------------------- */

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      sender: "lecturer",
      text: "Hello! Welcome to the Advanced React Development course.",
      time: "09:30 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hello sir! I have a question about the React assignment.",
      time: "09:32 AM",
    },
    {
      id: 3,
      sender: "lecturer",
      text: "Of course! Please tell me what you are having difficulty with.",
      time: "09:35 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "I am having some difficulty understanding useEffect and its dependency array.",
      time: "09:38 AM",
    },
    {
      id: 5,
      sender: "lecturer",
      text: "No problem. I will explain it in our next class. You can also ask me here anytime.",
      time: "09:40 AM",
    },
  ],
  2: [
    {
      id: 1,
      sender: "lecturer",
      text: "Hello! Have you started your UI/UX design project?",
      time: "10:15 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes ma'am. I have started working on the wireframes.",
      time: "10:20 AM",
    },
  ],
  3: [
    {
      id: 1,
      sender: "lecturer",
      text: "Please remember to practise Python functions before the next session.",
      time: "Yesterday",
    },
  ],
  4: [
    {
      id: 1,
      sender: "lecturer",
      text: "Your marketing case study assignment has been shared. Please review it.",
      time: "Yesterday",
    },
  ],
  5: [
    {
      id: 1,
      sender: "lecturer",
      text: "Welcome to JavaScript Fundamentals! Let me know if you need any help.",
      time: "Monday",
    },
  ],
};

/* -------------------- Messages Page -------------------- */

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);

  const [messages, setMessages] =
    useState<Record<number, Message[]>>(initialMessages);

  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showChat, setShowChat] = useState(false);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId
  )!;

  const activeMessages = messages[activeId] ?? [];

  /* -------------------- Search Contacts -------------------- */

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const query = search.toLowerCase();

      return (
        conversation.name.toLowerCase().includes(query) ||
        conversation.course.toLowerCase().includes(query) ||
        conversation.role.toLowerCase().includes(query)
      );
    });
  }, [search]);

  /* -------------------- Select Lecturer -------------------- */

  const selectConversation = (id: number) => {
    setActiveId(id);
    setShowChat(true);
  };

  /* -------------------- Send Message -------------------- */

  const sendMessage = () => {
    const text = messageText.trim();

    if (!text) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previous) => ({
      ...previous,
      [activeId]: [
        ...(previous[activeId] ?? []),
        newMessage,
      ],
    }));

    setMessageText("");
  };

  return (
    <div className="min-h-full bg-[#F5F7FF] p-4 md:p-8">

      {/* ================= PAGE HEADER ================= */}

      <header className="mb-6">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Communication Center
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Messages
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Connect with your lecturers and discuss your learning.
        </p>
      </header>

      {/* ================= CHAT CONTAINER ================= */}

      <section className="flex h-[calc(100vh-190px)] min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* ================= CONTACT LIST ================= */}

        <aside
          className={`w-full shrink-0 flex-col border-r border-slate-200 bg-white md:flex md:w-80 lg:w-96 ${
            showChat ? "hidden" : "flex"
          }`}
        >

          {/* Contact Header */}
          <div className="border-b border-slate-100 p-5">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Lecturers
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {conversations.length} Contacts
              </span>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Search size={18} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search lecturers..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

          </div>

          {/* Lecturer List */}
          <div className="flex-1 overflow-y-auto">

            <p className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              All Conversations
            </p>

            {filteredConversations.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <MessageSquare
                  size={30}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="text-sm font-medium text-slate-600">
                  No lecturers found
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const lastMessage =
                  messages[conversation.id]?.[
                    (messages[conversation.id]?.length ?? 1) - 1
                  ];

                const isActive = activeId === conversation.id;

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() =>
                      selectConversation(conversation.id)
                    }
                    className={`flex w-full items-start gap-3 border-b border-slate-100 px-5 py-4 text-left transition ${
                      isActive
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${conversation.color}`}
                      >
                        {conversation.initials}
                      </div>

                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-2">

                        <h3 className={`truncate text-sm font-semibold ${
                          isActive
                            ? "text-blue-700"
                            : "text-slate-900"
                        }`}>
                          {conversation.name}
                        </h3>

                        {conversation.unread > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                            {conversation.unread}
                          </span>
                        )}

                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {conversation.role}
                      </p>

                      <p className="mt-2 truncate text-xs text-slate-400">
                        {lastMessage?.text ?? "Start a conversation"}
                      </p>

                    </div>

                  </button>
                );
              })
            )}

          </div>

          {/* Contact Footer */}
          <div className="border-t border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <GraduationCap size={17} className="text-blue-600" />
              Contact your lecturers for academic support.
            </div>
          </div>

        </aside>

        {/* ================= CHAT AREA ================= */}

        <div
          className={`min-w-0 flex-1 flex-col bg-[#F8FAFF] ${
            showChat ? "flex" : "hidden md:flex"
          }`}
        >

          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">

            <div className="flex min-w-0 items-center gap-3">

              {/* Mobile Back Button */}
              <button
                type="button"
                onClick={() => setShowChat(false)}
                aria-label="Back to lecturers"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${activeConversation.color}`}
                >
                  {activeConversation.initials}
                </div>

                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-900 md:text-base">
                  {activeConversation.name}
                </h2>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Circle
                    size={7}
                    className={
                      activeConversation.online
                        ? "fill-emerald-500 text-emerald-500"
                        : "fill-slate-400 text-slate-400"
                    }
                  />

                  {activeConversation.online
                    ? "Online"
                    : "Offline"}{" "}
                  · {activeConversation.course}
                </p>
              </div>

            </div>

            {/* Chat Actions */}
            <div className="flex shrink-0 items-center gap-1">

              <button
                type="button"
                title="Voice call"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <Phone size={19} />
              </button>

              <button
                type="button"
                title="Video call"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <Video size={20} />
              </button>

              <button
                type="button"
                title="Conversation information"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <Info size={19} />
              </button>

              <button
                type="button"
                title="More options"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <MoreVertical size={19} />
              </button>

            </div>

          </div>

          {/* Course Information */}
          <div className="border-b border-blue-100 bg-blue-50/80 px-5 py-3">
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Course:</span>{" "}
              {activeConversation.course}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto p-4 md:p-6">

            <div className="my-2 flex justify-center">
              <span className="rounded-full bg-slate-200/70 px-4 py-1.5 text-[10px] font-medium text-slate-500">
                Conversation History
              </span>
            </div>

            {activeMessages.map((message) => {
              const isMine = message.sender === "me";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] ${
                      isMine ? "items-end" : "items-start"
                    } flex flex-col`}
                  >

                    {!isMine && (
                      <span className="mb-1 ml-1 text-[10px] font-semibold text-slate-500">
                        {activeConversation.name}
                      </span>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        isMine
                          ? "rounded-br-sm bg-blue-600 text-white"
                          : "rounded-bl-sm border border-slate-100 bg-white text-slate-700"
                      }`}
                    >
                      {message.text}
                    </div>

                    <div className={`mt-1 flex items-center gap-1 text-[10px] text-slate-400 ${
                      isMine ? "justify-end" : "justify-start"
                    }`}>
                      {message.time}

                      {isMine && (
                        <CheckCheck
                          size={13}
                          className="text-blue-500"
                        />
                      )}
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Message Input */}
          <div className="border-t border-slate-200 bg-white p-4 md:p-5">

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2"
            >

              <input
                type="text"
                value={messageText}
                onChange={(event) =>
                  setMessageText(event.target.value)
                }
                placeholder={`Message ${activeConversation.name}...`}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!messageText.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Send size={19} />
              </button>

            </form>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              Send a message to your lecturer.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-5 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

    </div>
  );
}
