import React, { useState, useEffect, useRef, memo } from "react";

const Timer = (props) => {
  const [delay, setDelay] = useState(60);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("level")) === "easy") {
      setDelay(60);
    } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
      setDelay(120);
    } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
      setDelay(180);
    }
  }, []);
  useEffect(() => {
    if (props.time !== 0) {
      setDelay(props.time.count);
    }
  }, [props.time]);

  const minutes = Math.floor(delay / 60);

  const seconds = Math.floor(delay % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      timeCount.current.style.display = "none";
      timeLeft.current.style.color = "red";
      timeLeft.current.style.display = "inline";
    } else {
      timeCount.current.style.display = "inline";
      timeLeft.current.style.display = "none";
    }
    return () => {
      clearInterval(timer);
    };
  });
console.log()
  const timeCount = useRef();
  const timeLeft = useRef();
  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(`${minutes}:${seconds}`));
    localStorage.setItem("timeSecond", JSON.stringify(delay));
    if (seconds < 30 && minutes < 1) {
      timeCount.current.style.color = "red";
    } else {
      timeCount.current.style.color = "yellow";
    }
  }, [seconds, minutes]);
  return (
    <>
      <div>
        <span style={{ fontSize: "2rem" }} ref={timeCount}>
          TIME {minutes}:{seconds}
        </span>
        <span style={{ fontSize: "2rem", display: "none" }} ref={timeLeft}>
          TIME LEFT!
        </span>
      </div>
    </>
  );
};

export default memo(Timer);
