import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EvaluationList from "../components/EvaluationList";
import Description from "../components/Description";
import Svg from "../components/Svg";
import DescriptionV2 from "../components/Descriptionv2";
import countTrueAnswer from "../helper/countTrueAnswer";
import apiData from "../helper/ApiData";
import finishEvaluation from "../helper/finishEvaluation";

function Evaluation() {
  const navigate = useNavigate();
  const { category, dificulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const questionList = localStorage.getItem("questions");
      const answersList = localStorage.getItem("answers");
      setQuestions(JSON.parse(questionList));
      setAnswers(JSON.parse(answersList));
    };
    fetchData();
  }, []);

  const finish = async () => {
    const datareq = {
      userdata_id: localStorage.getItem("userdata_id"),
      category: questions[0].category,
      difficulty: dificulty,
      poin: countTrueAnswer(questions, answers) * questions.length,
    };
    const response = await apiData(datareq, "POST", "http://127.0.0.1:8000/api/recent");
    const dataResponse = await response.json();
    if (response.ok && dataResponse.success) {
      finishEvaluation();
      navigate("/home");
    }
  };

  if (questions.length > 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 overflow-y-scroll gap-6 p-10">
        <div className="w-full flex flex-row items-center justify-around">
          <DescriptionV2 label={"Correct Answer"} value={`${countTrueAnswer(questions, answers)}/${questions.length}`} />
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-white font-black text-4xl ">Evaluation</h1>
            <div className="flex flex-row gap-5 text-white">
              <Description value={questions[0].category} label="Type" />
              <Description value={dificulty} label="Difficulty" />
            </div>
          </div>
          <DescriptionV2 label={"Your Score"} value={countTrueAnswer(questions, answers) * questions.length} />
        </div>
        <div className="flex flex-col gap-3 text-white w-full items-center justify-center">
          {questions.map((value, index) => {
            return <EvaluationList key={index} question={value} answer={answers[index]} />;
          })}
        </div>
        <button onClick={() => finish()} class="text-white font-semibold px-5 py-3 rounded-lg bg-green-400">
          Finish Review
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 overflow-y-scroll gap-6 p-10">
        <Svg />
      </div>
    );
  }
}

export default Evaluation;
