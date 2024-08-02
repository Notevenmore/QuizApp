const countTrueAnswer = (questionsData, answersData) => {
  let count = 0;
  questionsData.forEach((value, index) => {
    if (value.correct_answer === answersData[index]) {
      count += 1;
    }
  });
  return count;
};
export default countTrueAnswer;
