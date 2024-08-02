import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function List({ data, route, method, category }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-96 min-h-32 flex items-center justify-center gap-10 bg-gradient-to-r hover:from-cyan-700 hover:to-blue-700 from-cyan-500 to-blue-500"
      onClick={() => {
        if (method) {
          method(data.id, category);
        }
        navigate(`${route}${data.id}`);
      }}
    >
      <h1 className="text-3xl font-bold text-white ">{data.name}</h1>
    </div>
  );
}

export default List;
