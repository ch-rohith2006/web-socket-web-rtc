
"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Award,
  CalendarDays,
  UserRound,
  BookOpen,
  Download,
  Eye,
  X,
  ShieldCheck,
  Trophy,
  GraduationCap,
  Filter,
  FileCheck,
  Printer,
} from "lucide-react";

/* -------------------- Certificate Data -------------------- */

type Certificate = {
  id: number;
  certificateId: string;
  course: string;
  instructor: string;
  issuedOn: string;
  category: string;
  duration: string;
  grade: string;
  status: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    certificateId: "CERT-2026-001",
    course: "Introduction to Web Development",
    instructor: "Cody Fisher",
    issuedOn: "October 18, 2026",
    category: "Development",
    duration: "14 Hours",
    grade: "92%",
    status: "Verified",
  },
  {
    id: 2,
    certificateId: "CERT-2026-002",
    course: "JavaScript Fundamentals",
    instructor: "Kristin Watson",
    issuedOn: "September 30, 2026",
    category: "Programming",
    duration: "9 Hours",
    grade: "88%",
    status: "Verified",
  },
];

/* -------------------- Certificates Page -------------------- */

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Certificates");
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const filters = [
    "All Certificates",
    "Development",
    "Programming",
    "Design",
    "Other",
  ];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const matchesFilter =
        activeFilter === "All Certificates" ||
        (activeFilter === "Other"
          ? !["Development", "Programming", "Design"].includes(
              certificate.category
            )
          : certificate.category === activeFilter);

      const matchesSearch =
        certificate.course.toLowerCase().includes(search.toLowerCase()) ||
        certificate.instructor.toLowerCase().includes(search.toLowerCase()) ||
        certificate.certificateId.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const openCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= PAGE HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your Achievements
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            My Certificates
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your achievements and download your completed course certificates.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <Award size={23} />
          </div>

          <div>
            <p className="text-xl font-bold text-slate-900">
              {certificates.length}
            </p>
            <p className="text-xs text-slate-500">
              Certificates Earned
            </p>
          </div>
        </div>

      </header>

      {/* ================= STATISTICS ================= */}

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Award size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {certificates.length}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Certificates
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <ShieldCheck size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {certificates.filter((item) => item.status === "Verified").length}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Verified Certificates
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <GraduationCap size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {new Set(certificates.map((item) => item.category)).size}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Learning Categories
          </p>
        </div>

      </section>

      {/* ================= ACHIEVEMENT BANNER ================= */}

      <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg md:p-8">

        <div className="relative z-10 max-w-xl">

          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
            YOUR SUCCESS STORY
          </span>

          <h2 className="mt-5 text-2xl font-bold md:text-3xl">
            Every Achievement Deserves Recognition!
          </h2>

          <p className="mt-3 text-sm leading-6 text-blue-100">
            Your hard work and dedication have brought you this far.
            Keep learning, completing courses and earning new certificates.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Trophy size={21} />
            <span className="text-sm font-medium">
              Celebrate your learning milestones.
            </span>
          </div>

        </div>

        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-white/10" />

        <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 md:flex">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <Award size={82} className="text-white/90" />
          </div>
        </div>

      </section>

      {/* ================= CERTIFICATES LIST ================= */}

      <section className="mb-8">

        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Earned Certificates
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your successfully completed course certificates.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search certificates..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-64"
            />
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

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

        {/* Certificate Cards */}

        {filteredCertificates.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">

            <Award size={40} className="mx-auto mb-3 text-slate-400" />

            <h3 className="font-semibold text-slate-800">
              No Certificates Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different category.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            {filteredCertificates.map((certificate) => (

              <article
                key={certificate.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-5"
              >

                {/* Certificate Image Preview */}

                <button
                  type="button"
                  onClick={() => openCertificate(certificate)}
                  className="group relative block w-full overflow-hidden rounded-xl border-4 border-double border-amber-300 bg-gradient-to-br from-amber-50 via-white to-blue-50 p-5 text-center transition hover:shadow-md sm:p-7"
                >

                  <span className="absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-amber-400" />
                  <span className="absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-amber-400" />
                  <span className="absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-amber-400" />
                  <span className="absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-amber-400" />

                  <div className="relative">

                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Award size={30} />
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 sm:text-xs">
                      WebRTC Learning Academy
                    </p>

                    <h3 className="mt-3 font-serif text-2xl font-bold text-slate-800 sm:text-3xl">
                      Certificate
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Of Completion
                    </p>

                    <div className="mx-auto my-4 h-px max-w-56 bg-amber-300" />

                    <p className="text-xs text-slate-500">
                      This certificate is awarded to
                    </p>

                    <p className="mt-2 text-base font-bold text-blue-800 sm:text-lg">
                      Student
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      For successfully completing
                    </p>

                    <h4 className="mt-2 text-sm font-bold leading-5 text-slate-800 sm:text-base">
                      {certificate.course}
                    </h4>

                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-amber-200 pt-4">

                      <div className="text-left">
                        <p className="text-[9px] uppercase text-slate-400">
                          Instructor
                        </p>
                        <p className="mt-1 text-[10px] font-semibold text-slate-700">
                          {certificate.instructor}
                        </p>
                      </div>

                      <Award
                        size={34}
                        className="shrink-0 text-amber-500"
                      />

                      <div className="text-right">
                        <p className="text-[9px] uppercase text-slate-400">
                          Issue Date
                        </p>
                        <p className="mt-1 text-[10px] font-semibold text-slate-700">
                          {certificate.issuedOn}
                        </p>
                      </div>

                    </div>

                  </div>

                  <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition group-hover:bg-slate-950/20 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow">
                      <Eye size={15} />
                      Preview Certificate
                    </span>
                  </span>

                </button>

                {/* Certificate Information */}

                <div className="mt-5">

                  <div className="mb-3 flex items-center justify-between gap-2">

                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <ShieldCheck size={16} />
                      Verified Certificate
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-700">
                      {certificate.category}
                    </span>

                  </div>

                  <h3 className="text-base font-bold leading-6 text-slate-900">
                    {certificate.course}
                  </h3>

                  <div className="mt-4 space-y-3">

                    <div className="flex items-center gap-3">
                      <UserRound size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Instructor
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {certificate.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Issued On
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {certificate.issuedOn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FileCheck size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Certificate ID
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {certificate.certificateId}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}

                  <div className="mt-5 flex gap-3">

                    <button
                      type="button"
                      onClick={() => openCertificate(certificate)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 px-3 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <Eye size={17} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        openCertificate(certificate);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Download size={17} />
                      Download
                    </button>

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

      {/* ================= CERTIFICATE PREVIEW MODAL ================= */}

      {selectedCertificate && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
          onClick={() => setSelectedCertificate(null)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            className="my-auto w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl md:p-7"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="no-print mb-6 flex items-center justify-between">

              <div>
                <h2
                  id="certificate-modal-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Certificate Preview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and print your certificate.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close certificate"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={21} />
              </button>

            </div>

            {/* Printable Certificate */}

            <div
              id="certificate-print"
              className="overflow-hidden border-8 border-double border-amber-300 bg-gradient-to-br from-amber-50 via-white to-blue-50 p-6 text-center sm:p-10"
            >

              <Award
                size={55}
                className="mx-auto mb-4 text-amber-500"
              />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
                WebRTC Learning Academy
              </p>

              <h2 className="mt-5 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                Certificate
              </h2>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Of Completion
              </p>

              <div className="mx-auto my-6 h-px max-w-sm bg-amber-300" />

              <p className="text-sm text-slate-500">
                This certificate is proudly presented to
              </p>

              <h3 className="mt-4 text-2xl font-bold text-blue-800">
                Student
              </h3>

              <p className="mt-4 text-sm text-slate-500">
                For successfully completing the course
              </p>

              <h4 className="mt-3 text-xl font-bold text-slate-900">
                {selectedCertificate.course}
              </h4>

              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-amber-200 pt-5 text-left">

                <div>
                  <p className="text-xs text-slate-400">
                    Instructor
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedCertificate.instructor}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Date of Issue
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedCertificate.issuedOn}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs text-slate-400">
                    Certificate ID
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedCertificate.certificateId}
                  </p>
                </div>

              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={18} />
                Certificate of Completion
              </div>

            </div>

            {/* Modal Actions */}

            <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={printCertificate}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Printer size={17} />
                Print / Save as PDF
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Only the selected certificate is printed */}
      <style>{`
        @media print {
          @page {
            size: landscape;
            margin: 12mm;
          }

          body * {
            visibility: hidden !important;
          }

          #certificate-print,
          #certificate-print * {
            visibility: visible !important;
          }

          #certificate-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
