import { useEffect, useRef, useState } from "react";
import "../styles/Cards.css";
import Timer from "../components/Timer";
import Boards from "../components/Board";
import { Outlet, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
function Cards(props) {
  const [fruits, setFruits] = useState([]);
  function shuffle(arra1) {
    var ctr = arra1.length,
      temp,
      index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
  const card = useRef();
  // SHUFFLE ARRAY OF FRUITS
  useEffect(() => {
    setFruits([]);
    if (props.cards.cards !== undefined) {
      shuffle(props.cards.cards).forEach((fruit) =>
        setFruits((prev) => [...prev, { ...fruit, isFlip: false }])
      );
    }
  }, [props.cards]);
  // EMIT DATA TO PARENT
  const display = () => {
    props.displayChoose();
  };
  // FLIP CARD AND CHECK WIN OR LOSE
  const [hasWin, setHasWin] = useState(false);
  const win = useRef();
  let [map, setMap] = useState([]);
  let [timeString, setTimeString] = useState([]);
  let [timeSecond, setTimeSecond] = useState([]);

  const cardSelected = async (fruit, index) => {
    // PLAY AUDIO
    const myAudioElement = new Audio(
      "https://firebasestorage.googleapis.com/v0/b/flip-card-906d6.appspot.com/o/Drip-sound-effect-www_tiengdong_com.mp3?alt=media&token=4e6e4beb-0e26-4e11-beab-e47e41809f56"
    );
    myAudioElement.play();
    // REFLIP CARD

    if (map.length === 2 && map[0].fruitCards.name !== map[1].fruitCards.name) {
      fruits[map[0].index] = { ...map[0].fruitCards, isFlip: false };
      fruits[map[1].index] = { ...map[1].fruitCards, isFlip: false };
      setFruits(fruits);
      setMap([]);
    }
    setMap((prev) => [
      ...prev,
      { fruitCards: { ...fruit, isFlip: true }, index: index },
    ]);
    if (map.length === 1) {
      if (map[0].fruitCards.name === fruit.name) {
        fruits[map[0].index] = map[0].fruitCards;
        fruits[index] = { ...fruit, isFlip: true };
        setFruits(fruits);
        setMap([]);
      }
      //CHECK WIN AND LOSE
      const isWinner = fruits.every((fruit) => {
        return fruit.isFlip !== false;
      });
      console.log(JSON.parse(localStorage.getItem("time")));
      if (
        (isWinner !== true) &
        (JSON.parse(localStorage.getItem("time")) === "0:0")
      ) {
        setHasWin(false);
        win.current.style.display = "flex";
      } else if (
        (isWinner === true) &
        (JSON.parse(localStorage.getItem("time")) === "0:0")
      ) {
        setHasWin(false);
        win.current.style.display = "flex";
      } else if (isWinner === true) {
        setHasWin(true);
        setTimeString(JSON.parse(localStorage.getItem("time")));
        setTimeSecond(JSON.parse(localStorage.getItem("timeSecond")));
        win.current.style.display = "flex";
      }
    }
  };
  const [time, setTime] = useState(0);
  const replay = () => {
    setMap([]);
    setFruits([]);
    if (props.cards.cards !== undefined) {
      shuffle(props.cards.cards).forEach((fruit) =>
        setFruits((prev) => [...prev, { ...fruit, isFlip: false }])
      );
    }
    win.current.style.display = "none";
    if (JSON.parse(localStorage.getItem("level")) === "easy") {
      setTime({ count: 60 });
    } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
      setTime({ count: 120 });
    } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
      setTime({ count: 180 });
    }
  };
  // SAVE POINT
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const ShowPoint = (level) => {
    if (name !== "") {
      console.log("WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN", {
        name,
        timeString,
        timeSecond,
      });
      addDoc(collection(db, `board-${level}`), {
        name,
        timeString,
        timeSecond,
      })
        .then((docRef) => {
          console.log(
            "A New Document Field has been added to an existing document"
          );
          setName("");
          win.current.style.display = "none";
          replay();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      replay();
    }
  };

  const [board, setBoard] = useState([]);
  useEffect(() => {
    const fruitsRef = collection(
      db,
      `board-${JSON.parse(localStorage.getItem("level"))}`
    );

    getDocs(fruitsRef).then((res) => {
      res.docs.forEach((doc) =>
        setBoard((prev) => [
          ...prev,
          {
            ...doc.data(),
            id: doc.id,
          },
        ])
      );
    });
  }, []);
  const displayBoard = useRef();
  const showBoard = (level) => {
    displayBoard.current.style.left = "calc(50% - (255px /2 ))";
  };

  const hideBoard = (level) => {
    displayBoard.current.style.left = -100 + "%";
  };

  console.log(
    "Re-rendering",
    board.sort(function (a, b) {
      return a - b;
    })
  );
  return (
    <>
      <div className="cards">
        <div ref={win} className="win">
          {hasWin === true ? (
            <div className="win-content">
              <div className="text">YOU WIN!</div>
              <input
                placeholder="What's your name?"
                type="text"
                value={name}
                onChange={handleChange}
              />
              <div className="win-time">TIME: {timeString}</div>
              <div>
                <button onClick={() => display()} className="btn-win">
                  <Link className="btn-link" to="/">
                    BACK
                  </Link>
                </button>
                <button
                  className="btn-win"
                  onClick={() =>
                    ShowPoint(JSON.parse(localStorage.getItem("level")))
                  }
                >
                  ShowPoint
                </button>
              </div>
            </div>
          ) : (
            <div className="win-content">
              <div className="text">YOU LOSE!</div>
              <div className="win-time">TIME OUT!</div>
              <div>
                <button onClick={() => display()} className="btn-win">
                  <Link className="btn-link" to="/">
                    BACK
                  </Link>
                </button>
                <button className="btn-win" onClick={replay}>
                  REPLAY
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button className="btn-back" onClick={() => display()}>
            <Link className="btn-link-back" to="/">
              {"< "}BACK
            </Link>
          </button>
          <button
            onClick={() => showBoard(JSON.parse(localStorage.getItem("level")))}
            className="btn__board"
          >
            Board
          </button>
          <div ref={displayBoard} className="board-fixed">
            <Boards
              hideBoard={hideBoard}
              boards={board.sort(function (a, b) {
                return b.timeSecond - a.timeSecond;
              })}
            />
          </div>
          <div className="top">
            <div>
              <Timer time={time} />
            </div>
          </div>
          <h1>PLAYING...</h1>
          <div className="fruits">
            {fruits.map((fruit, index) => (
              <div
                ref={card}
                className={
                  JSON.parse(localStorage.getItem("level")) === "hard"
                    ? "card-hard"
                    : "card"
                }
                key={fruit.id}
              >
                {index === map[0]?.index ||
                index === map[1]?.index ||
                fruit.isFlip === true ? (
                  <div className="front">
                    <img
                      className="fruit-front"
                      alt="fruit-front"
                      src={fruit.img}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => cardSelected(fruit, index)}
                    className="back"
                  >
                    <img
                      className="fruit-back"
                      alt="fruit"
                      src="https://firebasestorage.googleapis.com/v0/b/flip-card-906d6.appspot.com/o/fruit%20(1).png?alt=media&token=f95f5270-d75c-42fa-bdf0-364c47c11291"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Cards;
