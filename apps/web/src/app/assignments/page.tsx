
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  BookOpen,
  ArrowRight,
  Filter,
  FileText,
  Upload,
  X,
  Eye,
  Trophy,
  GraduationCap,
} from "lucide-react";

/* -------------------- Assignment Types -------------------- */

type AssignmentStatus = "Pending" | "Submitted" | "Overdue";

type Assignment = {
  id: number;
  title: string;
  course: string;
  instructor: string;
  description: string;
  dueDate: string;
  submittedDate: string;
  status: AssignmentStatus;
  totalMarks: number;
  obtainedMarks: number | null;
  type: string;
};

/* -------------------- Assignment Data -------------------- */

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Responsive Website Design",
    course: "UI/UX Design Fundamentals",
    instructor: "Jane Cooper",
    description:
      "Create a responsive website layout using modern UI/UX design principles. Include desktop, tablet and mobile layouts.",
    dueDate: "November 12, 2026",
    submittedDate: "",
    status: "Pending",
    totalMarks: 100,
    obtainedMarks: null,
    type: "Practical",
  },
  {
    id: 2,
    title: "Python Programming Project",
    course: "Python Programming",
    instructor: "Robert Fox",
    description:
      "Build a small Python application demonstrating variables, functions, loops and object-oriented programming.",
    dueDate: "November 14, 2026",
    submittedDate: "",
    status: "Pending",
    totalMarks: 100,
    obtainedMarks: null,
    type: "Project",
  },
  {
    id: 3,
    title: "Marketing Case Study",
    course: "Digital Marketing Strategy",
    instructor: "Albert Flores",
    description:
      "Prepare a digital marketing case study covering SEO, social media strategy and campaign performance.",
    dueDate: "November 18, 2026",
    submittedDate: "",
    status: "Pending",
    totalMarks: 50,
    obtainedMarks: null,
    type: "Case Study",
  },
  {
    id: 4,
    title: "React Components Assignment",
    course: "Advanced React Development",
    instructor: "John Smith",
    description:
      "Build reusable React components and demonstrate state management and component composition.",
    dueDate: "November 5, 2026",
    submittedDate: "",
    status: "Overdue",
    totalMarks: 100,
    obtainedMarks: null,
    type: "Practical",
  },
  {
    id: 5,
    title: "HTML and CSS Fundamentals",
    course: "Introduction to Web Development",
    instructor: "Cody Fisher",
    description:
      "Create a basic webpage using semantic HTML and responsive CSS styling.",
    dueDate: "October 28, 2026",
    submittedDate: "October 26, 2026",
    status: "Submitted",
    totalMarks: 100,
    obtainedMarks: 92,
    type: "Practical",
  },
  {
    id: 6,
    title: "JavaScript Functions and Arrays",
    course: "JavaScript Fundamentals",
    instructor: "Kristin Watson",
    description:
      "Complete programming exercises using JavaScript functions, arrays and objects.",
    dueDate: "October 25, 2026",
    submittedDate: "October 24, 2026",
    status: "Submitted",
    totalMarks: 100,
    obtainedMarks: 88,
    type: "Exercise",
  },
];

const filters = ["All", "Pending", "Submitted", "Overdue"] as const;

/* -------------------- Assignments Page -------------------- */

export default function AssignmentsPage() {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /* -------------------- Submission Statistics -------------------- */

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  const overdueCount = assignments.filter(
    (item) => item.status === "Overdue"
  ).length;

  const totalMarks = assignments
    .filter((item) => item.obtainedMarks !== null)
    .reduce((sum, item) => sum + (item.obtainedMarks ?? 0), 0);

  /* -------------------- Search and Filters -------------------- */

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        item.status === activeFilter;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase()) ||
        item.instructor.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [assignments, search, activeFilter]);

  /* -------------------- Submit Assignment -------------------- */

  const handleSubmitAssignment = () => {
    if (!selectedAssignment || !selectedFile) return;

    setAssignments((previous) =>
      previous.map((item) =>
        item.id === selectedAssignment.id
          ? {
              ...item,
              status: "Submitted",
              submittedDate: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            }
          : item
      )
    );

    setSelectedAssignment(null);
    setShowSubmitModal(false);
    setSelectedFile(null);
  };

  /* -------------------- Page UI -------------------- */

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your Learning Tasks
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Assignments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your assignments, track deadlines and submit your work.
          </p>
        </div>

        <Link
          href="/my-learning"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
        >
          <BookOpen size={18} />
          My Learning
        </Link>

      </header>

      {/* ================= SUBMISSION OVERVIEW ================= */}

      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-7">

        <div className="mb-5 flex items-center justify-between gap-3">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Submission Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your assignment completion progress.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Trophy size={22} />
          </div>

        </div>

        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm font-semibold text-slate-700">
            Assignments Submitted
          </span>

          <span className="text-sm font-bold text-slate-900">
            {Math.round((submittedCount / assignments.length) * 100)}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
            style={{
              width: `${(submittedCount / assignments.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />

            <div>
              <p className="text-lg font-bold text-slate-900">
                {submittedCount}
              </p>

              <p className="text-xs text-slate-500">
                Submitted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-500" />

            <div>
              <p className="text-lg font-bold text-slate-900">
                {pendingCount}
              </p>

              <p className="text-xs text-slate-500">
                Pending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />

            <div>
              <p className="text-lg font-bold text-slate-900">
                {overdueCount}
              </p>

              <p className="text-xs text-slate-500">
                Overdue
              </p>
            </div>
          </div>

        </div>

        {submittedCount > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">
              Total marks obtained in graded submissions:

              <span className="ml-2 font-bold text-slate-800">
                {totalMarks}
              </span>
            </p>
          </div>
        )}

      </section>

      {/* ================= MY ASSIGNMENTS ================= */}

      <section className="mb-8">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            My Assignments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View, manage and submit your course assignments.
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
                placeholder="Search assignments..."
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

        {/* Assignment Cards */}

        {filteredAssignments.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">

            <ClipboardList
              size={38}
              className="mx-auto mb-3 text-slate-400"
            />

            <h3 className="font-semibold text-slate-800">
              No Assignments Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different filter.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredAssignments.map((item) => (

              <article
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
              >

                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                  {/* Assignment Details */}

                  <div className="flex min-w-0 flex-1 items-start gap-4">

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        item.status === "Submitted"
                          ? "bg-emerald-100 text-emerald-600"
                          : item.status === "Overdue"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FileText size={23} />
                    </div>

                    <div className="min-w-0">

                      <div className="mb-2 flex flex-wrap items-center gap-2">

                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                          {item.type}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                            item.status === "Submitted"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Overdue"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.course}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Instructor: {item.instructor}
                      </p>

                    </div>

                  </div>

                  {/* Deadline and Marks */}

                  <div className="flex flex-wrap items-center gap-5 lg:justify-end">

                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Due Date
                      </p>

                      <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CalendarDays
                          size={16}
                          className={
                            item.status === "Overdue"
                              ? "text-red-500"
                              : "text-blue-500"
                          }
                        />

                        {item.dueDate}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Marks
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {item.obtainedMarks !== null
                          ? `${item.obtainedMarks}/${item.totalMarks}`
                          : `--/${item.totalMarks}`}
                      </p>
                    </div>

                    {/* Action Buttons */}

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssignment(item);
                          setShowSubmitModal(false);
                        }}
                        aria-label={`View ${item.title}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </button>

                      {item.status !== "Submitted" && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAssignment(item);
                            setShowSubmitModal(true);
                            setSelectedFile(null);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          <Upload size={15} />
                          Submit
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

   

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

      {/* ================= VIEW ASSIGNMENT MODAL ================= */}

      {selectedAssignment && !showSubmitModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedAssignment(null)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-view-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="mb-5 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FileText size={23} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <span className="text-xs font-semibold uppercase text-blue-600">
              {selectedAssignment.type}
            </span>

            <h2
              id="assignment-view-title"
              className="mt-2 text-xl font-bold text-slate-900"
            >
              {selectedAssignment.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {selectedAssignment.course}
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">

              <h3 className="text-sm font-semibold text-slate-800">
                Assignment Instructions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedAssignment.description}
              </p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Instructor
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedAssignment.instructor}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Due Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedAssignment.dueDate}
                </p>
              </div>

            </div>

            {selectedAssignment.status !== "Submitted" && (
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(true);
                  setSelectedFile(null);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Upload size={17} />
                Submit Assignment
              </button>
            )}

          </div>

        </div>

      )}

      {/* ================= SUBMIT ASSIGNMENT MODAL ================= */}

      {selectedAssignment && showSubmitModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => {
            setShowSubmitModal(false);
            setSelectedFile(null);
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-submit-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2
                  id="assignment-submit-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Submit Assignment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Upload your completed assignment.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  setSelectedFile(null);
                }}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mb-5 rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Assignment
              </p>

              <h3 className="mt-1 text-sm font-bold text-slate-800">
                {selectedAssignment.title}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Due: {selectedAssignment.dueDate}
              </p>

            </div>

            <label
              htmlFor="assignment-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center transition hover:bg-blue-100"
            >

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600">
                <Upload size={24} />
              </div>

              <p className="text-sm font-semibold text-slate-800">
                Choose your assignment file
              </p>

              <p className="mt-2 text-xs text-slate-500">
                PDF, DOC, DOCX, ZIP or image file
              </p>

              <input
                id="assignment-file"
                type="file"
                accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                className="sr-only"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] ?? null)
                }
              />

            </label>

            {selectedFile && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">

                <FileText size={20} className="shrink-0 text-emerald-600" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {selectedFile.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <CheckCircle2 size={19} className="text-emerald-600" />

              </div>
            )}

            <button
              type="button"
              disabled={!selectedFile}
              onClick={handleSubmitAssignment}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Upload size={17} />
              Submit Assignment
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
              Demo only: this updates the status locally. Actual file
              uploading and permanent submission require backend integration.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}
