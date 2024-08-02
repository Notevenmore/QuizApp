import apiData from "./ApiData";

const takeQuestion = async (category, dificulty) => {
  const resp = await apiData([], "GET", `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dificulty}`);
  const data = await resp.json();
  return data;
};

export default takeQuestion;
