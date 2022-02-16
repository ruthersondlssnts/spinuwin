import "./styles.css";
import { useEffect } from "react";
import SpinUWin from "./SpinUWin";

export default function App() {
  let data = [
    {
      fillStyle: "#364c62",
      text: "₱200",
      textFillStyle: "white"
    },
    {
      fillStyle: "#efc319",
      text: "₱0",
      textFillStyle: "white"
    },
    {
      fillStyle: "#e57e25",
      text: "₱1,999",
      textFillStyle: "white"
    },
    {
      fillStyle: "#e64c3b",
      text: "₱0",
      textFillStyle: "white"
    },
    {
      fillStyle: "#e61e63",
      text: "₱3,200",
      textFillStyle: "white"
    },
    {
      fillStyle: "#94a4a5",
      text: "₱3,200",
      textFillStyle: "white"
    },
    {
      fillStyle: "#0fa085",
      text: "₱0",
      textFillStyle: "white"
    },
    {
      fillStyle: "#2880b9",
      text: "₱5,600",
      textFillStyle: "white"
    },
    {
      fillStyle: "#884a9c",
      text: "₱3,200",
      textFillStyle: "white"
    },
    {
      fillStyle: "#91406d",
      text: "₱3,200",
      textFillStyle: "white"
    }
  ];
  return (
    <div className="App">
      <SpinUWin data={data} duration={5} winner={1} />
    </div>
  );
}
