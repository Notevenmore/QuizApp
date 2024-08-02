import "../App.css";
import decodeHTML from "../helper/decodeHTML";

function EvaluationList({ question, answer }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-r ${answer === question.correct_answer ? "from-green-600 via-green-500 to-green-400" : "from-red-600 via-red-500 to-red-400"} w-[90vw] min-h-[20vh]`}>
      <h1 className="font-black text-3xl text-center">{decodeHTML(question.question)}</h1>
      <h1 className="font-semibold text-lg">Your Answer: {answer ? decodeHTML(answer) : "You not answer this question"}</h1>
      <h1 className="font-semibold text-lg">The Answer: {decodeHTML(question.correct_answer)}</h1>
    </div>
  );
}

export default EvaluationList;
