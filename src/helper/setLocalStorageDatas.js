const setLocalStorageDatas = (id, category) => {
  localStorage.setItem("finishUntil", JSON.stringify(new Date(new Date().getTime() + 10 * 60 * 1000)));
  localStorage.setItem("working", true);
  localStorage.setItem("category", category);
  localStorage.setItem("difficulty", id);
};

export default setLocalStorageDatas;
