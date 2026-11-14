
"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Camera,
  Edit3,
  Save,
  X,
  Globe,
  Award,
  Clock,
} from "lucide-react";

export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    title: "Senior Full Stack Developer & Instructor",
    email: "sarah.johnson@example.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, India",
    experience: "8 Years",
    qualification: "M.Tech in Computer Science",
    bio: "Passionate educator and software developer with experience in teaching modern web technologies. I enjoy helping students build practical skills through real-world projects and interactive learning.",
    website: "www.sarahjohnson.dev",
    linkedin: "linkedin.com/in/sarahjohnson",
  });

  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Web Development",
  ];

  const handleChange = (
    field: keyof typeof profile,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated in this demo. Connect an API to save changes permanently.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and teaching profile.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <X size={17} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Profile Banner */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-36 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 sm:h-48" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-sm sm:h-32 sm:w-32">
                SJ
                <button
                  type="button"
                  title="Change profile photo"
                  className="absolute -bottom-2 -right-2 rounded-full border-2 border-white bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                  onClick={() =>
                    alert("Connect a profile image upload API here.")
                  }
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 sm:pb-1">
                <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active Teacher
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                  <Award size={14} />
                  Verified Profile
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-indigo-600">
                {profile.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={16} />
                  {profile.experience} Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Students",
              value: "248",
              icon: User,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "My Courses",
              value: "12",
              icon: BookOpen,
              color: "text-violet-600 bg-violet-50",
            },
            {
              label: "Teaching Hours",
              value: "1,240",
              icon: Clock,
              color: "text-orange-600 bg-orange-50",
            },
            {
              label: "Experience",
              value: "8 Years",
              icon: Award,
              color: "text-green-600 bg-green-50",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <div className={`rounded-lg p-2.5 ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                <User className="text-indigo-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  { label: "Full Name", field: "name" as const, icon: User },
                  { label: "Professional Title", field: "title" as const, icon: Briefcase },
                  { label: "Email Address", field: "email" as const, icon: Mail },
                  { label: "Phone Number", field: "phone" as const, icon: Phone },
                  { label: "Location", field: "location" as const, icon: MapPin },
                  { label: "Experience", field: "experience" as const, icon: CalendarDays },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.field}>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        {item.label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          value={profile[item.field]}
                          readOnly={!isEditing}
                          onChange={(e) =>
                            handleChange(item.field, e.target.value)
                          }
                          className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition ${
                            isEditing
                              ? "border-indigo-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              : "border-gray-100 bg-gray-50"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Professional Biography
                </label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className={`w-full resize-none rounded-lg border p-3 text-sm leading-6 text-gray-700 outline-none transition ${
                    isEditing
                      ? "border-indigo-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      : "border-gray-100 bg-gray-50"
                  }`}
                />
              </div>
            </section>

            {/* Education */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                <GraduationCap className="text-indigo-600" size={21} />
                <h3 className="text-lg font-bold text-gray-900">
                  Education
                </h3>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {profile.qualification}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Computer Science and Engineering
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Educational qualification
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Award className="text-indigo-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  Skills & Expertise
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-gray-900">
                Contact Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="break-all text-sm font-medium text-gray-800">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-800">
                      {profile.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-800">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-gray-900">
                Social Links
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe size={19} className="mt-1 text-gray-500" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Website</p>
                    {isEditing ? (
                      <input
                        value={profile.website}
                        onChange={(e) =>
                          handleChange("website", e.target.value)
                        }
                        className="mt-1 w-full rounded-md border border-indigo-200 px-2 py-1 text-sm outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <p className="break-all text-sm font-medium text-indigo-600">
                        {profile.website}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {/* Globe replaces the unsupported Linkedin icon */}
                  <Globe size={19} className="mt-1 text-blue-600" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">LinkedIn</p>
                    {isEditing ? (
                      <input
                        value={profile.linkedin}
                        onChange={(e) =>
                          handleChange("linkedin", e.target.value)
                        }
                        className="mt-1 w-full rounded-md border border-indigo-200 px-2 py-1 text-sm outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <p className="break-all text-sm font-medium text-indigo-600">
                        {profile.linkedin}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Account Information */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Account Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-semibold text-gray-800">
                    Teacher
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">Account Status</span>
                  <span className="font-semibold text-green-600">
                    Active
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-semibold text-gray-800">
                    January 2024
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
