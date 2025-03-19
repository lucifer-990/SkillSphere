import React from "react";

const Description = ({ input, setInput }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <textarea
      name="description"
      value={input.description}
      onChange={handleChange}
      placeholder="Enter course description"
      className="w-full h-32 p-2 border rounded"
    />
  );
};

export default Description;
