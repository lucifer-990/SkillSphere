import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="relative bg-gradient-to-tl from-[#374151] via-[#f43f5e] to-[#fb923c] dark:from-[#0e7490] dark:via-[#3b82f6] dark:to-[#4f46e5] py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          SkillSphere – Learn, Grow, Succeed!
        </h1>
        <p className="text-white mb-8 mt-2">
          SkillSphere is an all-in-one Learning Management System designed to
          help you acquire new skills and advance your career with interactive
          courses, engaging content, and seamless learning experiences.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-1 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="bg-blue-600 dark:bg-indigo-800 text-white px-6 py-3 rounded-r-full hover:bg-blue-700">
            Search
          </Button>
        </form>
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
        >
          Explore courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
