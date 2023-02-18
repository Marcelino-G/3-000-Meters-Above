
import { Link, useLocation } from "react-router-dom";
import BattlefielCanvas from "./BattlefieldCanvas";
import { useNavigate } from "react-router-dom";



function App(props) {

  const navigate = useNavigate();
  const location = useLocation();

  const {enemies} = location.state;
  const {playerGroup} = location.state
  const {playerName} = location.state
  const {playerAge} = location.state
  sessionStorage.setItem("playerGroup", playerGroup)
  sessionStorage.setItem("playerName", playerName)
  sessionStorage.setItem("playerAge", playerAge)



  let {chapter} = location.state
  let chapterInt = parseInt(chapter) + 1;
  sessionStorage.setItem("chapter", chapterInt)

  const resetGame = () => {
    sessionStorage.clear();
    navigate("/")
  }

  

  return (
    <div id="gameplayHolder">
      <header className="row">
        <h1 className="col-11">
          3,000 Meters Above
        </h1>
        <button onClick={resetGame} className='col-1'>
          Reset
        </button>
      </header>
      <BattlefielCanvas enemies = {enemies}/>
      <ul id="controls">
        <li>
          <kbd>W</kbd>
          <span> Move up</span>
        </li>
        <li>
          <kbd>A</kbd>
          <span> Move left</span>
        </li>
        <li>
          <kbd>S</kbd>
          <span> Move down</span>
        </li>
        <li>
          <kbd>D</kbd>
          <span> Move right</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
