import "../App.css";
import decodeHTML from "../helper/decodeHTML";

function DescriptionV2({ value, label }) {
  return (
    <div className="p-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex flex-col items-center">
      <p className="font-bold text-lg text-white">{label}</p>
      <p className="font-bold text-5xl text-white">{value}</p>
    </div>
  );
}

export default DescriptionV2;
