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
        setFruits((prev) => [...prev, fruit])
      );
    }
  }, [props.cards]);
  // EMIT DATA TO PARENT
  const display = () => {
    props.displayChoose();
  };
  // FLIP CARD AND CHECK WIN OR LOSE
  let [map, setMap] = useState([]);
  const cardSelected = (fruit, index) => {
    //FLIP
    fruits[index] = { ...fruit, isFlip: true };
    setFruits(fruits);
    if (map.length < 1) {
      //PUSH TO CHECK THE NEXT CARD
      setMap([{ fruitMap: fruit, index: index }]);
      console.log("sett");
    } else if (map.length >= 1) {
      // AFTER PUSH, CHECK PREVIOUS CARD EQUAL OR NOT EQUAL PRESENT CARD
      console.log("gett");
      if (map[0].fruitMap.name !== fruit.name) {
        fruits[index] = { ...fruit, isFlip: false };
        fruits[map[0].index] = { ...map[0].fruitMap, isFlip: false };
        setFruits(fruits);
      }
//CHECK WIN AND LOSE
      const isWinner = fruits.every((fruit) => {
        return fruit.isFlip !== false;
      });
      console.log("EVERY", isWinner);
      if (isWinner === true) {
        console.log("WIN THE GAME");
        console.log(JSON.parse(localStorage.getItem("time")));
      }
      // SET EMPTY WHEN FLIPPED TWO CARDS
      setMap([]);
      console.log("get", map);
    }
  };
  return (
    <>
      <div className="cards">
        <div>
          <Timer />
          <button onClick={() => display()}>
            <Link to="/">BACK</Link>
          </button>

          <h1>This Cards</h1>
          <div className="fruits">
            {fruits.map((fruit, index) => (
              <div className="card" key={fruit.id}>
                {fruit.isFlip === true ? (
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
