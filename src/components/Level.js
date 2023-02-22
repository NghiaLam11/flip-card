import { useRef, useState, memo, useEffect } from "react";
import "../styles/Level.css";
import { Outlet, Link } from "react-router-dom";
import { db } from "../firebase";
function Level(props) {
  // PLAY AUDIO WHEN HOVER SELECT LEVEL
  const mouseMoveToPlayAudio = () => {
    const myAudioElement = new Audio(
      "https://firebasestorage.googleapis.com/v0/b/flip-card-906d6.appspot.com/o/Drip-sound-effect-www_tiengdong_com.mp3?alt=media&token=4e6e4beb-0e26-4e11-beab-e47e41809f56"
    );
    myAudioElement.play();
  };
// HTML GREET ELEMENT
  const greet = useRef();
// HTML LEVEL ELEMENT
  const level = useRef();
  // HIDDEN GREET ELEMENT
  const hidden = () => {
    greet.current.style.display = "none";
  };
  // CHOOSE LEVEL
  const chooseLevel = (levelName) => {
    props.chooseLevel(levelName);
    localStorage.setItem("level", JSON.stringify(levelName));
    level.current.style.display = "none";
  };
  // CHECK PATH 
  useEffect(() => {
    if (window.location.pathname !== "/") {
      level.current.style.display = "none";
    } else {
      level.current.style.display = "flex";
    }
  }, [props.display]);
console.log('level')
  return (
    <>
      <div ref={level} className="level">
        <div ref={greet} className="greet">
          <div onClick={hidden} className="skip">
            Skippp{">>>"}
          </div>
          <div className="title">
            Hé nhô! <br /> Chào mừng bạn!
          </div>
          <img
            className="img__greet"
            alt="duahau"
            src="https://firebasestorage.googleapis.com/v0/b/flip-card-906d6.appspot.com/o/watermelon%20(2).png?alt=media&token=72008748-50cc-4951-8b8b-7b6b60a65c8f"
          />
        </div>
        <div>
          <h1>CHOOSE!</h1>
          <div>
            <button
              onMouseEnter={mouseMoveToPlayAudio}
              onClick={() => chooseLevel("easy")}
            >
              <Link to="/card/easy">EASY</Link>
            </button>
            <button
              onMouseEnter={mouseMoveToPlayAudio}
              onClick={() => chooseLevel("medium")}
            >
              <Link to="/card/medium">MEDIUM</Link>
            </button>
            <button
              onMouseEnter={mouseMoveToPlayAudio}
              onClick={() => chooseLevel("hard")}
            >
              <Link to="/card/hard">HARD</Link>
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Level;
