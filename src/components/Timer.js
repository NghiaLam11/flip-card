import React, { useState, useEffect, useRef, memo } from "react";

const Timer = () => {
  const [delay, setDelay] = useState(300);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("level")) === "easy") {
      setDelay(300);
    } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
      setDelay(420);
    } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
      setDelay(540);
    }
  }, []);

  const minutes = Math.floor(delay / 60);

  const seconds = Math.floor(delay % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      timeCount.current.style.display = "none";
    }

    return () => {
      clearInterval(timer);
    };
  });

  const timeCount = useRef();
  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(`${minutes}:${seconds}`));
    if (seconds < 30 && minutes < 1) {
      timeCount.current.style.color = "red";
    } else {
      timeCount.current.style.color = "yellow";
    }
  }, [seconds, minutes]);

  return (
    <>
      <span style={{ fontSize: "2rem" }} ref={timeCount}>
        {minutes}:{seconds}
      </span>
    </>
  );
};

export default memo(Timer);
