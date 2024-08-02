const logout = () => {
  localStorage.removeItem("userdata_id");
  localStorage.removeItem("login");
  window.location.href = "/login";
};
export default logout;
