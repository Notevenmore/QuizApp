import "../App.css";
import React from "react";
import decodeHTML from "../helper/decodeHTML";

function Question({ data, options, addAnswer, indexNow, answer }) {
  return (
    <div className="flex flex-col gap-20 w-[50rem]">
      <h1 className="text-white font-bold text-4xl text-center bg-purple-500 p-10 rounded-2xl box shadow-lg shadow-black">{decodeHTML(data.question)}</h1>
      <div className="flex flex-row items-center justify-center gap-5">
        {options.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => addAnswer(indexNow, value)}
              className={`flex items-center text-center justify-center p-5 rounded-xl text-white font-semibold shadow-lg hover:shadow-md hover:shadow-black shadow-black ${answer === value ? "bg-green-500" : "bg-indigo-500"}`}
            >
              {decodeHTML(value)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
