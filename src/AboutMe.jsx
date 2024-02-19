import React from "react";
import profileImage from "./assets/picture1.jpg";

export default function AboutMe() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">About Me</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-45 h-42 rounded-t-lg object-cover mx-auto mb-4"
        />
        <div className="flex items-center mb-4">
          <div className="mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Mr. Natdanai Wongsa</h2>
            <h3 className="text-gray-500 text-lg mb-2">
              Major: Information Technology
            </h3>
            <h3 className="text-gray-500 text-lg mb-2">
              Web Developer (Workshop2)
            </h3>
            <h3 className="text-gray-500 text-lg mb-2">
              Email: 641413019@crru.ac.th
            </h3>
            <h3 className="text-gray-500 text-lg mb-2">Tel: 096-357-8839</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
