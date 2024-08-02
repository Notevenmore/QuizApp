import "../App.css";
import React from "react";

import List from "./List";

function Lists({ datas, route, method, category }) {
  return (
    <div className="grid grid-cols-3 items-center justify-center gap-10">
      {datas.map((value, index) => {
        if (method) {
          return <List key={index} data={value} route={route} method={method} category={category} />;
        } else {
          return <List key={index} data={value} route={route} />;
        }
      })}
    </div>
  );
}

export default Lists;
