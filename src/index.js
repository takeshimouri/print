import React from "react";
import ReactDOM from "react-dom";
import { PrintPage } from "./print";

function App() {
  return (
    <>
      <PrintPage />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
