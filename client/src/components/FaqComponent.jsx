import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";

const faqs = [
  {
    question: "What is this LMS about?",
    answer:
      "This LMS is a platform that allows users to enroll in courses, track progress, and interact with instructors.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply create an account, browse the courses, and click on the enroll button to start learning.",
  },
  {
    question: "Is there a certification upon completion?",
    answer:
      "Yes, you will receive a certificate upon successfully completing a course.",
  },
  {
    question: "Can I access the courses for free?",
    answer:
      "Some courses are free, while others require a one-time payment or subscription.",
  },
];

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 mt-20 ">
      <h2 className="text-xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border rounded-2xl shadow-md">
            <button
              className="w-full p-4 flex justify-between items-center text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <CardContent className="p-2 ">{faq.answer}</CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
