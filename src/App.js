import { useRef, useEffect, useState } from "react";
import { db } from "./firebase";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Level from "./components/Level";
import Cards from "./pages/Cards";
function App() {
  const [cards, setCards] = useState([]);
  // SET LEVEL
  const [level, setLevel] = useState(JSON.parse(localStorage.getItem("level")) === null ? 'easy' : JSON.parse(localStorage.getItem("level")));
  // IF LEVEL IS EMPTY => SET LEVEL IS EASY LEVEL
  if (!JSON.parse(localStorage.getItem("level"))) {
    localStorage.setItem("level", JSON.stringify("easy"));
  }
// LOAD WHEN FETCHING API
  const load = useRef();
  // HIDDEN GREET AND DISPLAY CHOOSE LEVEL
  const [display, setDisplay] = useState(false);

  const chooseLevel = (level) => {
    setLevel(level);
    console.log("Parent", level);
  };
  const displayChoose = () => {
    setDisplay(!display);
  };
  // FETCH API WHEN CHANGE LEVEL
  useEffect(() => {
    const fruitsRef = collection(db, level);

    getDocs(fruitsRef).then((res) => {
      load.current.style.display = "flex";
      res.docs.forEach((doc) =>
        setCards({
          ...doc.data(),
          idRound: doc.id,
        })
      );
      load.current.style.display = "none";
    });
  }, [level]);
  return (
    <div className="App">
      <div ref={load} className="load">
        <div className="loader">
          <div className="loaderBar"></div>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Level display={display} chooseLevel={chooseLevel} />}
          >
            <Route
              path={`/card/${level}`}
              element={<Cards displayChoose={displayChoose} cards={cards} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
