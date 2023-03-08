import { memo } from "react";
import "../styles/Board.css"
function Boards(props) {
  console.log(props);
  const hide = () => {
    props.hideBoard()
  };
  return (
    <>
      <div className="board">
        <h1>This is Board</h1>
        <div className="rank">
          {props.boards.map((point, index) => {
            return (
              <div key={point.id}>
                <div>
                <span className="rank__number">{index + 1}.</span> <span className="rank__name">{point.name} - {point.timeString}s</span>  
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
        <hr />
       <button className="btn__hide" onClick={hide}>Hide</button>
      </div>
    </>
  );
}

export default memo(Boards);
