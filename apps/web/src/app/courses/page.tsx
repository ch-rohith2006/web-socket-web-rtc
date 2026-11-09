
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  BookOpen,
  GraduationCap,
  Clock3,
  Star,
  Users,
  ArrowRight,
  PlayCircle,
  Code2,
  Palette,
  Megaphone,
  BriefcaseBusiness,
  Filter,
  X,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";

/* -------------------- Course Data -------------------- */

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    category: "Development",
    description:
      "Learn HTML, CSS, JavaScript, React and Next.js by building real-world projects.",
    lessons: 48,
    duration: "32 hours",
    level: "Beginner",
    students: 1250,
    rating: 4.9,
    badge: "Bestseller",
    icon: Code2,
    gradient: "from-blue-700 to-indigo-500",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Jane Cooper",
    category: "Design",
    description:
      "Learn user research, wireframing, prototyping and modern interface design.",
    lessons: 24,
    duration: "12 hours",
    level: "Beginner",
    students: 850,
    rating: 4.8,
    badge: "Popular",
    icon: Palette,
    gradient: "from-purple-700 to-pink-500",
  },
  {
    id: 3,
    title: "Python Programming for Beginners",
    instructor: "Robert Fox",
    category: "Programming",
    description:
      "Start your programming journey with Python, practical exercises and projects.",
    lessons: 35,
    duration: "16 hours",
    level: "Beginner",
    students: 980,
    rating: 4.9,
    badge: "Bestseller",
    icon: Code2,
    gradient: "from-slate-800 to-cyan-600",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Albert Flores",
    category: "Marketing",
    description:
      "Explore SEO, social media marketing, advertising and digital growth strategies.",
    lessons: 28,
    duration: "10 hours",
    level: "Intermediate",
    students: 620,
    rating: 4.7,
    badge: "Popular",
    icon: Megaphone,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 5,
    title: "Photography Masterclass",
    instructor: "Brooklyn Simmons",
    category: "Design",
    description:
      "Master photography techniques, lighting, composition and image editing.",
    lessons: 20,
    duration: "8 hours",
    level: "Beginner",
    students: 430,
    rating: 4.6,
    badge: "New",
    icon: Palette,
    gradient: "from-slate-500 to-slate-800",
  },
  {
    id: 6,
    title: "Advanced React and Next.js",
    instructor: "Cody Fisher",
    category: "Development",
    description:
      "Build scalable modern applications using React, Next.js and TypeScript.",
    lessons: 42,
    duration: "24 hours",
    level: "Advanced",
    students: 760,
    rating: 4.9,
    badge: "Advanced",
    icon: Code2,
    gradient: "from-indigo-700 to-blue-500",
  },
  {
    id: 7,
    title: "Business Management Essentials",
    instructor: "Kristin Watson",
    category: "Business",
    description:
      "Understand business planning, leadership, management and decision making.",
    lessons: 30,
    duration: "15 hours",
    level: "Intermediate",
    students: 510,
    rating: 4.7,
    badge: "New",
    icon: BriefcaseBusiness,
    gradient: "from-emerald-700 to-teal-500",
  },
  {
    id: 8,
    title: "JavaScript Fundamentals",
    instructor: "Courtney Henry",
    category: "Programming",
    description:
      "Learn JavaScript basics, functions, objects, asynchronous programming and more.",
    lessons: 26,
    duration: "14 hours",
    level: "Beginner",
    students: 1100,
    rating: 4.8,
    badge: "Popular",
    icon: Code2,
    gradient: "from-orange-500 to-amber-500",
  },
] as const;

const categories = [
  "All Courses",
  "Development",
  "Programming",
  "Design",
  "Marketing",
  "Business",
];

/* -------------------- Courses Page -------------------- */

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[number] | null
  >(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All Courses" ||
        course.category === activeCategory;

      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const categoryCount = (category: string) => {
    if (category === "All Courses") return courses.length;

    return courses.filter(
      (course) => course.category === category
    ).length;
  };

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Discover Your Next Skill
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Explore Courses
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Discover courses, learn new skills and achieve your goals.
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

      {/* ================= FEATURED BANNER ================= */}

      <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg md:p-9">

        <div className="relative z-10 max-w-xl">

          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
            FEATURED LEARNING
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight md:text-4xl">
            Learn New Skills.
            <br />
            Build Your Future.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100 md:text-base">
            Explore expert-led courses, develop practical skills and
            take the next step in your career.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById("course-catalog")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore Courses
            <ArrowRight size={17} />
          </button>

        </div>

        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-white/10" />

        <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 md:flex">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <GraduationCap size={90} className="text-white/90" />
          </div>
        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <BookOpen size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {courses.length}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Available Courses
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Layers size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {categories.length - 1}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Learning Categories
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Users size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            6.5K+
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Student Enrollments
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Award size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            4.8/5
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Average Course Rating
          </p>
        </div>

      </section>

      {/* ================= COURSE CATALOG ================= */}

      <section id="course-catalog" className="mb-8">

        {/* Section Header */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Browse All Courses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find the right course for your learning journey.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4">

            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">
              <Search size={19} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses, instructors or categories..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">

              <Filter size={17} className="mr-1 text-slate-400" />

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {category}
                  <span className="ml-2 opacity-70">
                    {categoryCount(category)}
                  </span>
                </button>
              ))}

            </div>
          </div>

        </div>

        {/* Course Results */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">
            {activeCategory}
          </h3>

          <p className="text-xs text-slate-500">
            Showing {filteredCourses.length} courses
          </p>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">

            <BookOpen size={38} className="mx-auto mb-3 text-slate-400" />

            <h3 className="font-semibold text-slate-800">
              No Courses Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Courses");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>
        ) : (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredCourses.map((course) => {
              const Icon = course.icon;

              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Course Thumbnail */}
                  <div
                    className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${course.gradient}`}
                  >
                    <Icon size={68} className="text-white/90" />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700">
                      {course.badge}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-lg bg-black/20 px-3 py-1.5 text-xs font-medium text-white">
                      {course.level}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="p-5">

                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        {course.category}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    </div>

                    <h3 className="min-h-12 text-base font-bold leading-6 text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      Instructor: {course.instructor}
                    </p>

                    <p className="mt-3 min-h-12 text-sm leading-5 text-slate-500">
                      {course.description}
                    </p>

                    {/* Course Information */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-4">

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <BookOpen size={15} className="text-blue-500" />
                        {course.lessons} Lessons
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock3 size={15} className="text-blue-500" />
                        {course.duration}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users size={15} className="text-blue-500" />
                        {course.students.toLocaleString()} Students
                      </span>

                    </div>

                    {/* Course Action */}
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Course Details
                      <ArrowRight size={17} />
                    </button>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* ================= BOTTOM BANNER ================= */}

      <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center md:p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <GraduationCap size={27} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Start Your Learning Journey Today!
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore our courses and build your future with new skills.
            </p>
          </div>

        </div>

        <Link
          href="/my-learning"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          My Learning
          <ArrowRight size={17} />
        </Link>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

      {/* ================= COURSE DETAILS MODAL ================= */}

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-modal-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">

              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {selectedCourse.category}
              </span>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close course details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            <div className={`mb-5 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${selectedCourse.gradient}`}>
              <selectedCourse.icon size={60} className="text-white" />
            </div>

            <h2
              id="course-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              {selectedCourse.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {selectedCourse.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Instructor</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedCourse.instructor}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Difficulty</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedCourse.level}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Lessons</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedCourse.lessons}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Duration</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedCourse.duration}
                </p>
              </div>

            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-amber-600">
              <Star size={17} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold">
                {selectedCourse.rating}/5
              </span>
              <span className="text-slate-500">
                · {selectedCourse.students.toLocaleString()} students
              </span>
            </div>

            <Link
              href="/my-learning"
              onClick={() => setSelectedCourse(null)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go to My Learning
              <ArrowRight size={17} />
            </Link>

            <p className="mt-3 text-center text-xs text-slate-400">
              Course enrollment and payment are not connected yet.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
