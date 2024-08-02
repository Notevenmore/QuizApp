import "../App.css";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Lists from "../components/Lists";
import setLocalStorageDatas from "../helper/setLocalStorageDatas";
import finishEvaluation from "../helper/finishEvaluation";

function Category() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);

  const hasConfirmed = useRef(false);
  useEffect(() => {
    const workingStatus = localStorage.getItem("working");
    const category = localStorage.getItem("category");
    const difficulty = localStorage.getItem("difficulty");
    if (workingStatus && !hasConfirmed.current) {
      const tryAgain = window.confirm("Terdapat kuis yang belum selesai. Apakah anda ingin melanjutkan?");
      if (tryAgain) {
        hasConfirmed.current = true;
        alert("Selamat Melanjutkan");
        navigate(`/category/${category}/dificulty/${difficulty}`);
      } else {
        finishEvaluation();
      }
    }
    return () => {};
  }, [navigate]);

  const { category } = useParams();
  const listDificulty = [
    { name: "Easy", id: "easy" },
    { name: "Medium", id: "medium" },
    { name: "Hard", id: "hard" },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 gap-14 p-10">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-white font-black text-5xl">Quiz Level</h1>
        <p className="text-blue-400 cursor-pointer" onClick={() => navigate("/home")}>
          {" "}
          {"<<"} Return to Home
        </p>
      </div>
      <Lists datas={listDificulty} category={category} route={"/category/" + category + "/dificulty/"} method={setLocalStorageDatas} />
    </div>
  );
}

export default Category;
