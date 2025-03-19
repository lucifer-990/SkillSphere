import { File, School, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 md-4 border-t-4 border-black p-4 bg-gradient-to-r from-blue-500 to-purple-600  dark:from-indigo-900  dark:to-blue-700">
      <div className="container mx-auto px-4">
        <Link href="/" className=" text-tertiary-light font-extrabold">
          SkillSphere
        </Link>
        <h4 className="font-extrabold text-[20px] py-6">
          Empowering education with Technology
        </h4>
        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p className="font-bold">123 Road</p>
            <div className="flex items-center py-4 font-bold">
              <School />
              <p className="ml-2 font-bold">SkillSphere</p>
            </div>
            <div className="flex items-center">
              <File />
              <p className="ml-2 font-bold">123-456-789</p>
            </div>
            <div className="flex items-center pt-4 mb-4">
              <MessageCircle />
              <p className="ml-2 font-bold">skillsphere</p>
            </div>
          </div>
          <div className="flex-1 md:text-center font-bold">
            <p className="pb-4">Our courses</p>
            <p className="pb-4">Get in Touch</p>
            <p className="pb-4">Privacy policy</p>
            <p className="pb-4">Terms of service</p>
            <p>Contribute</p>
          </div>
          <div className="flex-1 md:text-right font-bold">
            <p className="pb-4">Blogs</p>
            <p className="pb-4">Technology</p>
            <p className="pb-4">Faq</p>
            <p className="pb-4">support</p>
            <p className="font-bold">Follow us</p>
          </div>
        </div>
      </div>
      <div className="border-t-2  h-10 md:h-[30px] mt-4 pt-2.5 w-full bottom-0 left-0 items-center flex justify-center font-bold text-lg">
        {" "}
        created with ❤️ by team Byte-Blazers 2025 © All rights reserved by
        Byte-Blazers
      </div>
    </footer>
  );
};

export default Footer;
