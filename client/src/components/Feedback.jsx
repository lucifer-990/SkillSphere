import React from "react";

const Feedback = () => {
  const sponsors = [
    { name: "coding ninja", logo: "/coding-ninja.svg" },
    { name: "google", logo: "/google.svg" },
    { name: "leetcode", logo: "/leetcode.svg" },
    { name: "SBI", logo: "/sbi.svg" },
  ];
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 mt-20 ">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-6">Our Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="p-4 rounded-lg shadow-md">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
