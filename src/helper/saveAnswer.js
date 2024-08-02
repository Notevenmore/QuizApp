const saveAnswer = (answers, category, dificulty) => {
  localStorage.setItem("answers", JSON.stringify(answers));
  window.location.href = `/category/${category}/dificulty/${dificulty}/evaluation`;
};
export default saveAnswer;
