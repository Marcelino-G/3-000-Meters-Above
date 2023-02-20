import {useLocation} from "react-router-dom";
import BattlefielCanvas from "./BattlefieldCanvas";
import Reset from "./Reset";

function Game(props) {

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

  return (
    <div id="gameplayHolder">
      <header className="row">
        <h1 className="col-11">
          3,000 Meters Above
        </h1>
        <Reset/>
      </header>
      <BattlefielCanvas enemies = {enemies} chapter={chapter}/>
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

export default Game;
