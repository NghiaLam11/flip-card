import { useEffect, useRef, useState } from "react";
import "../styles/Cards.css";
import Timer from "../components/Timer";
import { Outlet, Link } from "react-router-dom";
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
  let [name, setName] = useState([]);
  const cardSelected = async (fruit, index) => {
    if (map.length === 2 && map[0].fruitCards.name !== map[1].fruitCards.name) {
      fruits[map[0].index] = { ...map[0].fruitCards, isFlip: false };
      fruits[map[1].index] = { ...map[1].fruitCards, isFlip: false };
      setFruits(fruits);
      setMap([]);
    }
    console.log(fruits);
    console.log(map, "Mapp");
    setMap((prev) => [
      ...prev,
      { fruitCards: { ...fruit, isFlip: true }, index: index },
    ]);
    console.log(map);
    if (map.length === 1) {
      console.log("FULL");
      if (map[0].fruitCards.name === fruit.name) {
        fruits[map[0].index] = map[0].fruitCards;
        fruits[index] = { ...fruit, isFlip: true };
        setFruits(fruits);
        setMap([]);
        // setName(prev => [...prev, map[0].name])
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
        win.current.style.display = "flex";
      }
    }
    // console.log(map[0], "MAPpppp");
    // //FLIP
    // fruits[index] = { ...fruit, isFlip: true };
    // setFruits(fruits);
    // if (map.length < 1) {
    //   console.log(map[0], "MAP < 1");
    //   setMap([]);
    //   //PUSH TO CHECK THE NEXT CARD
    //   console.log("LESS THAN 1 CARD");
    //   setMap([{ fruitMap: fruit, index: index }]);
    //   console.log(map[0], "MAP < 11");
    // } else if (map.length >= 1) {
    //   console.log(map[0], "MAP > 1");
    //   console.log("MORE THAN 1 CARD");
    //   // AFTER PUSH, CHECK PREVIOUS CARD EQUAL OR NOT EQUAL PRESENT CARD
    //   if (map[0].fruitMap.name !== fruit.name) {
    //     fruits[index] = { ...fruit, isFlip: false };
    //     fruits[map[0].index] = { ...map[0].fruitMap, isFlip: false };
    //     setFruits(fruits);
    //     setMap([{ fruitMap: fruit, index: index }]);
    //     console.log('NOT EQUAL')
    //   } else if (map[0].fruitMap.name === fruit.name) {
    //     fruits[index] = { ...fruit, isFlip: true };
    //     fruits[map[0].index] = { ...map[0].fruitMap, isFlip: true };
    //     setFruits(fruits);
    //     console.log('EQUAL')
    //   }
    //   //CHECK WIN AND LOSE
    //   const isWinner = fruits.every((fruit) => {
    //     return fruit.isFlip !== false;
    //   });
    //   console.log(JSON.parse(localStorage.getItem("time")));
    //   if (
    //     (isWinner !== true) &
    //     (JSON.parse(localStorage.getItem("time")) === "0:0")
    //   ) {
    //     setHasWin(false);
    //     win.current.style.display = "flex";
    //   } else if (
    //     (isWinner === true) &
    //     (JSON.parse(localStorage.getItem("time")) === "0:0")
    //   ) {
    //     setHasWin(false);
    //     win.current.style.display = "flex";
    //   } else if (isWinner === true) {
    //     setHasWin(true);
    //     win.current.style.display = "flex";
    //   }
    //   // SET EMPTY WHEN FLIPPED TWO CARDS
    //   //  if (
    //   //     map[0].fruitMap.name !== fruit.name &&
    //   //     fruits[index].isFlip === true
    //   //   ) {
    //   //     setTimeout(()  => {
    //   //       console.log(fruits, map[0]);
    //   // fruits[index] = { ...fruit, isFlip: false };
    //   // fruits[map[0].index] = { ...map[0].fruitMap, isFlip: false };
    //   // setFruits(fruits);
    //   //   }, 500);
    //   // }
    //   console.log(map, "MAP");
    // }
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
      setTime({ count: 180 });
    } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
      setTime({ count: 240 });
    } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
      setTime({ count: 300 });
    }
  };

  console.log("Re-rendering");
  return (
    <>
      <div className="cards">
        <div ref={win} className="win">
          {hasWin === true ? (
            <div className="win-content">
              <div className="text">YOU WIN!</div>
              <div className="win-time">
                TIME: {JSON.parse(localStorage.getItem("time"))}
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
          <div className="top">
            <div>
              <Timer time={time} />
            </div>
          </div>
          <h1>PLAYING...</h1>
          <div className="fruits">
            {fruits.map((fruit, index) => (
              <div className="card" key={fruit.id}>
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
