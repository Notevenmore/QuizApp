const apiData = async (data, method, url) => {
  try {
    let response;
    if (method === "POST") {
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(url, {
        method: method,
      });
    }
    return response;
  } catch (error) {
    console.error("There was a problem with saving the data:", error);
  }
};

export default apiData;
