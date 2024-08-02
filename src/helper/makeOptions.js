function makeOptions(incorrect_answers, correct_answer) {
  const randomTrueAnswer = Math.round(Math.random() * incorrect_answers.length);
  let answerOption = incorrect_answers;
  answerOption.push(correct_answer);
  [answerOption[randomTrueAnswer], answerOption[answerOption.length - 1]] = [answerOption[answerOption.length - 1], answerOption[randomTrueAnswer]];
  return answerOption;
}

export default makeOptions;
