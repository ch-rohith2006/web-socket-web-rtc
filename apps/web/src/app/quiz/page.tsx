
"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Brain,
  Clock3,
  CheckCircle2,
  Trophy,
  BookOpen,
  ArrowRight,
  Filter,
  Code2,
  Palette,
  Terminal,
  PlayCircle,
  X,
  Award,
  Target,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

/* -------------------- Types -------------------- */

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizStatus = "Not Started" | "Completed";

type Quiz = {
  id: number;
  title: string;
  category: string;
  description: string;
  instructor: string;
  questions: Question[];
  duration: number;
  level: string;
  students: number;
  status: QuizStatus;
  score: number | null;
  icon: typeof Code2;
  gradient: string;
};

/* -------------------- Sample Quiz Data -------------------- */

const initialQuizzes: Quiz[] = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    category: "Programming",
    description:
      "Test your knowledge of React components, props, state and hooks.",
    instructor: "John Smith",
    duration: 15,
    level: "Beginner",
    students: 1250,
    status: "Not Started",
    score: null,
    icon: Code2,
    gradient: "from-blue-700 to-indigo-500",
    questions: [
      {
        question: "What is React primarily used for?",
        options: [
          "Building user interfaces",
          "Managing databases",
          "Creating operating systems",
          "Writing server hardware drivers",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which React Hook is used to manage local component state?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useMemo",
        ],
        correctAnswer: 1,
      },
      {
        question: "Why are keys used when rendering lists in React?",
        options: [
          "To style HTML elements",
          "To create API requests",
          "To identify list elements between renders",
          "To automatically validate forms",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Python Programming Quiz",
    category: "Programming",
    description:
      "Evaluate your understanding of Python syntax, data types and functions.",
    instructor: "Robert Fox",
    duration: 20,
    level: "Beginner",
    students: 980,
    status: "Not Started",
    score: null,
    icon: Terminal,
    gradient: "from-slate-800 to-cyan-600",
    questions: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: [
          "function",
          "func",
          "define",
          "def",
        ],
        correctAnswer: 3,
      },
      {
        question: "What is the result of len([1, 2, 3])?",
        options: [
          "2",
          "3",
          "4",
          "6",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Python data structure stores key-value pairs?",
        options: [
          "List",
          "Tuple",
          "Dictionary",
          "Set",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Knowledge Test",
    category: "Design",
    description:
      "Check your knowledge of user experience, wireframes and design principles.",
    instructor: "Jane Cooper",
    duration: 15,
    level: "Intermediate",
    students: 850,
    status: "Not Started",
    score: null,
    icon: Palette,
    gradient: "from-purple-700 to-pink-500",
    questions: [
      {
        question: "What is the primary purpose of a wireframe?",
        options: [
          "To define the basic structure of an interface",
          "To write application logic",
          "To store user information",
          "To deploy a website",
        ],
        correctAnswer: 0,
      },
      {
        question: "What does usability focus on?",
        options: [
          "The number of images on a page",
          "How easily users can achieve their goals",
          "The size of the database",
          "The programming language used",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which design property helps distinguish text from its background?",
        options: [
          "Animation",
          "Border radius",
          "Color contrast",
          "File compression",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript Fundamentals Quiz",
    category: "Programming",
    description:
      "Test your JavaScript knowledge, including variables, arrays and operators.",
    instructor: "Courtney Henry",
    duration: 20,
    level: "Intermediate",
    students: 1100,
    status: "Completed",
    score: 80,
    icon: Code2,
    gradient: "from-orange-500 to-amber-500",
    questions: [
      {
        question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
        options: [
          "var",
          "let",
          "const",
          "function",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which operator checks strict equality in JavaScript?",
        options: [
          "==",
          "===",
          "=",
          "!=",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does the array map() method return?",
        options: [
          "A new array",
          "A single number",
          "A boolean value",
          "The original array only",
        ],
        correctAnswer: 0,
      },
    ],
  },
];

const filters = ["All Quizzes", "Not Started", "Completed"];

/* -------------------- Quizzes Page -------------------- */

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Quizzes");

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [modalMode, setModalMode] = useState<
    "details" | "taking" | "results" | null
  >(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  /* -------------------- Statistics -------------------- */

  const completedCount = quizzes.filter(
    (quiz) => quiz.status === "Completed"
  ).length;

  const pendingCount = quizzes.filter(
    (quiz) => quiz.status === "Not Started"
  ).length;

  const averageScore = completedCount
    ? Math.round(
        quizzes
          .filter((quiz) => quiz.status === "Completed")
          .reduce((sum, quiz) => sum + (quiz.score ?? 0), 0) /
          completedCount
      )
    : 0;

  /* -------------------- Search and Filters -------------------- */

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesFilter =
        activeFilter === "All Quizzes" ||
        quiz.status === activeFilter;

      const matchesSearch =
        quiz.title.toLowerCase().includes(search.toLowerCase()) ||
        quiz.category.toLowerCase().includes(search.toLowerCase()) ||
        quiz.instructor.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [quizzes, search, activeFilter]);

  /* -------------------- Quiz Actions -------------------- */

  const openQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setModalMode("details");
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(null);
  };

  const startQuiz = () => {
    if (!selectedQuiz) return;

    setAnswers(
      Array(selectedQuiz.questions.length).fill(-1)
    );
    setCurrentQuestion(0);
    setScore(null);
    setModalMode("taking");
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers((previous) => {
      const updated = [...previous];
      updated[currentQuestion] = answerIndex;
      return updated;
    });
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;

    const correctAnswers = selectedQuiz.questions.reduce(
      (total, question, index) =>
        total +
        (answers[index] === question.correctAnswer ? 1 : 0),
      0
    );

    const finalScore = Math.round(
      (correctAnswers / selectedQuiz.questions.length) * 100
    );

    setScore(finalScore);

    setQuizzes((previous) =>
      previous.map((quiz) =>
        quiz.id === selectedQuiz.id
          ? {
              ...quiz,
              status: "Completed",
              score: finalScore,
            }
          : quiz
      )
    );

    setModalMode("results");
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setModalMode(null);
    setAnswers([]);
    setCurrentQuestion(0);
    setScore(null);
  };

  /* -------------------- Page UI -------------------- */

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* Header */}
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Test Your Knowledge
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Quizzes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Practice what you've learned and track your quiz performance.
          </p>
        </div>

      </header>

   

      {/* Featured Banner */}
      <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg md:p-8">

        <div className="relative z-10 max-w-xl">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
            LEARNING CHALLENGE
          </span>

          <h2 className="mt-5 text-2xl font-bold md:text-3xl">
            Challenge Yourself!
          </h2>

          <p className="mt-3 text-sm leading-6 text-blue-100">
            Test your skills, improve your knowledge and discover
            how much you have learned through your courses.
          </p>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("Not Started");
              document.getElementById("quiz-catalog")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Start a Quiz
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-white/10" />

        <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 md:flex">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <Brain size={82} className="text-white/90" />
          </div>
        </div>

      </section>

      {/* Quiz Catalog */}
      <section id="quiz-catalog" className="mb-8">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Explore Quizzes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose a quiz and check your understanding.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">
              <Search size={18} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search quizzes..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:w-64"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Filter size={17} className="mr-1 text-slate-400" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Quiz Cards */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">
            {activeFilter}
          </h3>

          <p className="text-xs text-slate-500">
            Showing {filteredQuizzes.length} quizzes
          </p>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <Brain size={38} className="mx-auto mb-3 text-slate-400" />
            <h3 className="font-semibold text-slate-800">
              No Quizzes Found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or choose a different filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredQuizzes.map((quiz) => {
              const Icon = quiz.icon;

              return (
                <article
                  key={quiz.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Quiz Cover */}
                  <div
                    className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${quiz.gradient}`}
                  >
                    <Icon size={65} className="text-white/90" />

                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        quiz.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-white text-blue-700"
                      }`}
                    >
                      {quiz.status}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-lg bg-black/20 px-3 py-1.5 text-xs font-medium text-white">
                      {quiz.level}
                    </span>
                  </div>

                  {/* Quiz Details */}
                  <div className="p-5">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {quiz.category}
                    </p>

                    <h3 className="min-h-12 text-base font-bold leading-6 text-slate-900">
                      {quiz.title}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {quiz.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-4">

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <BookOpen size={15} className="text-blue-500" />
                        {quiz.questions.length} Questions
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock3 size={15} className="text-blue-500" />
                        {quiz.duration} min
                      </span>

                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        By {quiz.instructor}
                      </span>

                      {quiz.score !== null && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <Trophy size={14} />
                          {quiz.score}%
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => openQuiz(quiz)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {quiz.status === "Completed"
                        ? "Retake Quiz"
                        : "Start Quiz"}
                      <ArrowRight size={17} />
                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>


      {/* Footer */}
      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

      {/* ================= QUIZ DETAILS AND QUIZ MODAL ================= */}

      {selectedQuiz && modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={closeQuiz}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Brain size={23} />
                </div>

                <div>
                  <h2
                    id="quiz-modal-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    {modalMode === "details"
                      ? "Quiz Details"
                      : modalMode === "taking"
                        ? "Quiz in Progress"
                        : "Quiz Results"}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {selectedQuiz.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeQuiz}
                aria-label="Close quiz"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Details Mode */}
            {modalMode === "details" && (
              <>
                <div className={`mb-5 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${selectedQuiz.gradient}`}>
                  <selectedQuiz.icon size={58} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {selectedQuiz.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedQuiz.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Questions</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedQuiz.questions.length}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Time Limit</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedQuiz.duration} minutes
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Difficulty</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedQuiz.level}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Instructor</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedQuiz.instructor}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startQuiz}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <PlayCircle size={18} />
                  Begin Quiz
                </button>
              </>
            )}

            {/* Taking Quiz */}
            {modalMode === "taking" && (
              <>
                {(() => {
                  const question = selectedQuiz.questions[currentQuestion];

                  return (
                    <>
                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-600">
                          Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock3 size={14} />
                          {selectedQuiz.duration} minutes suggested
                        </span>
                      </div>

                      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%`,
                          }}
                        />
                      </div>

                      <h3 className="mb-6 text-lg font-bold leading-7 text-slate-900">
                        {question.question}
                      </h3>

                      <div className="space-y-3">
                        {question.options.map((option, index) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectAnswer(index)}
                            aria-pressed={answers[currentQuestion] === index}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                              answers[currentQuestion] === index
                                ? "border-blue-500 bg-blue-50 text-blue-800"
                                : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                            }`}
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                              answers[currentQuestion] === index
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-300"
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>

                            {option}
                          </button>
                        ))}
                      </div>

                      <div className="mt-7 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          disabled={currentQuestion === 0}
                          onClick={() => setCurrentQuestion((previous) => previous - 1)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={17} />
                          Previous
                        </button>

                        {currentQuestion < selectedQuiz.questions.length - 1 ? (
                          <button
                            type="button"
                            disabled={answers[currentQuestion] === undefined || answers[currentQuestion] === -1}
                            onClick={() => setCurrentQuestion((previous) => previous + 1)}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            Next
                            <ChevronRight size={17} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={answers.some((answer) => answer === -1)}
                            onClick={finishQuiz}
                            className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            Submit Quiz
                          </button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </>
            )}

            {/* Results Mode */}
            {modalMode === "results" && (
              <>
                <div className="py-4 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Trophy size={42} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Quiz Completed!
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Great effort! Here is your quiz result.
                  </p>

                  <p className="mt-5 text-5xl font-bold text-blue-600">
                    {score}%
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {Math.round((score ?? 0) / 100 * selectedQuiz.questions.length)} out of {selectedQuiz.questions.length} correct answers
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    {score === 100
                      ? "Excellent work! You answered every question correctly."
                      : score !== null && score >= 60
                        ? "Well done! Keep practising to improve further."
                        : "Keep learning and try the quiz again."}
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedQuiz.questions.map((question, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-800">
                        {index + 1}. {question.question}
                      </p>

                      <p className={`mt-2 text-xs font-medium ${
                        answers[index] === question.correctAnswer
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}>
                        Your answer: {question.options[answers[index]]}
                      </p>

                      {answers[index] !== question.correctAnswer && (
                        <p className="mt-1 text-xs text-emerald-700">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <RotateCcw size={16} />
                    Try Again
                  </button>

                  <button
                    type="button"
                    onClick={closeQuiz}
                    className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Finish
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
