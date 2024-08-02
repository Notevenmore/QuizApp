const finishEvaluation = () => {
  localStorage.removeItem("questions");
  localStorage.removeItem("answers");
  localStorage.removeItem("difficulty");
  localStorage.removeItem("finishUntil");
  localStorage.removeItem("working");
  localStorage.removeItem("category");
};

export default finishEvaluation;
