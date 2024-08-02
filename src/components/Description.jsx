import "../App.css";
import decodeHTML from "../helper/decodeHTML";

function EvaluationList({ value, label }) {
  return (
    <p class="text-xl font-extrabold">
      {label}: <span class="font-black underline underline-offset-2">{value}</span>
    </p>
  );
}

export default EvaluationList;
