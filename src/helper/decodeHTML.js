const decodeHTML = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export default decodeHTML;
