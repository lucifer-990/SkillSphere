import React from "react";

const ContentSection = () => {
  return (
    <div className="relative bg-gradient-to-tl from-[#374151] via-[#f43f5e] to-[#fb923c] dark:from-[#0e7490] dark:via-[#3b82f6] dark:to-[#4f46e5] py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Empower Your Learning Journey Anytime, Anywhere
        </h1>
        <p className="text-white mb-8 mt-2">
          Join thousands of learners and access high-quality courses to enhance
          your skills and knowledge
        </p>
      </div>
      <div className="flex flex-row gap-20 items-center justify-center mt-20">
        {/* Key Features Section */}
        <div className="flex flex-col">
          <h1 className="text-white text-4xl font-bold mb-4 text-center">
            Key Features
          </h1>
          <ul className="flex flex-col items-start text-white text-lg space-y-2">
            <li>
              Flexible Learning: Learn at your own pace with 24/7 course access
            </li>
            <li>
              Expert Instructors: Gain insights from industry professionals.
            </li>
            <li> Interactive Lessons: Engaging video lectures</li>
            <li>Certifications: Earn certificates upon course completion.</li>
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col">
          <h1 className="text-white text-4xl font-bold mb-4 text-center">
            Why Choose Us?
          </h1>
          <ul className="flex flex-col items-start text-white text-lg space-y-2">
            <li>🎓 Comprehensive Course Library – Covering diverse topics.</li>
            <li>📱 User-Friendly Interface – Easy navigation</li>
            <li>🤝 Connect with learners and instructors for guidance</li>
            <li>⚡ Seamless learning experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
