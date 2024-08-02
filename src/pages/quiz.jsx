import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import takeQuestion from "../helper/takeQuestion";
import Question from "../components/Question";
import Svg from "../components/Svg";
import makeOptions from "../helper/makeOptions";
import saveAnswer from "../helper/saveAnswer";
import formatTime from "../helper/formatTime";

function Quiz() {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("login");
  if (!loginStatus) {
    navigate("/login");
  }

  const { category, dificulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(localStorage.getItem("answers") ? JSON.parse(localStorage.getItem("answers")) : []);
  const [options, setOptions] = useState([]);
  const [indexNow, setIndexNow] = useState(0);
  const [count, setCount] = useState(0);
  const [deadline, setDeadline] = useState(0);

  useEffect(() => {
    const listAnswer = localStorage.getItem("answers");
    setAnswers(JSON.parse(listAnswer));
  }, []);

  useEffect(() => {
    let i = 0;
    answers.map((value) => {
      if (value !== undefined) {
        i++;
      }
    });
    setCount(i);
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      const questionList = localStorage.getItem("questions");
      if (questionList) {
        setQuestions(JSON.parse(questionList));
      } else {
        const data = await takeQuestion(category, dificulty);
        if (data && data.results) {
          setQuestions(data.results);
          localStorage.setItem("questions", JSON.stringify(data.results));
        }
      }
    };
    fetchData();
  }, [category, dificulty]);

  useEffect(() => {
    if (questions.length > 0) {
      let theoptions = [];
      questions.map((value) => {
        theoptions.push(makeOptions(value.incorrect_answers, value.correct_answer));
      });
      setOptions(theoptions);
    }
  }, [questions]);

  useEffect(() => {
    const timeEnds = localStorage.getItem("finishUntil");
    if (timeEnds) {
      const timeEnd = new Date(JSON.parse(timeEnds));
      const timeRemeaning = Math.round(Math.floor((timeEnd - new Date()) / 1000));
      setDeadline(timeRemeaning);
    }
  }, []);

  useEffect(() => {
    if (deadline <= 0) return;
    const intervalId = setInterval(() => {
      setDeadline((prevDeadline) => {
        const newDeadline = prevDeadline - 1;
        if (newDeadline <= 0) {
          clearInterval(intervalId);
          localStorage.removeItem("finishUntil");
          saveAnswer(answers, category, dificulty);
        }
        return newDeadline;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [deadline]);

  const addAnswer = (index, newAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (!updatedAnswers[index]) {
        setCount(count + 1);
      }
      while (updatedAnswers.length <= index) {
        updatedAnswers.push(undefined);
      }
      updatedAnswers[index] = newAnswer;
      return updatedAnswers;
    });
    if (indexNow < questions.length - 1) {
      setIndexNow(indexNow + 1);
    }
  };

  useEffect(() => {
    localStorage.removeItem("answers");
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-row absolute top-10 gap-4 ">
        <div className="w-30 h-30 bg-purple-500 text-white font-black text-4xl px-24 py-5 rounded-3xl flex flex-col text-center shadow-lg hover:shadow-md hover:shadow-black shadow-black">
          <div className="w-full text-start">Answered = {count}</div>
          <div className="w-full bg-white h-1 my-2"></div>
          <div className="w-full">Total = {questions.length}</div>
        </div>
        <div className="w-30 h-30 bg-purple-500 text-white font-black text-4xl px-24 py-5 rounded-3xl flex flex-col text-center gap-2 shadow-lg hover:shadow-md hover:shadow-black shadow-black">
          <div className="w-full text-start">Deadline</div>
          <div>{formatTime(deadline)}</div>
        </div>
      </div>
      {questions.length > 0 && options.length > 0 ? <Question data={questions[indexNow]} options={options[indexNow]} addAnswer={addAnswer} indexNow={indexNow} answer={answers[indexNow]} /> : <Svg />}
      <div className="flex flex-row gap-4 absolute bottom-10">
        {questions.map((value, index) => {
          return (
            <div key={index} onClick={() => setIndexNow(index)} className={`px-10 py-3 rounded-xl cursor-pointer text-white font-bold hover:scale-110 ${index === indexNow ? "bg-blue-500" : answers[index] ? "bg-green-500" : "bg-pink-500"}`}>
              {index + 1}
            </div>
          );
        })}
        <div onClick={() => saveAnswer(answers, category, dificulty)} className="px-10 py-3 rounded-xl cursor-pointer text-white font-bold hover:scale-110 bg-pink-500">
          Finish
        </div>
      </div>
    </div>
  );
}

export default Quiz;
