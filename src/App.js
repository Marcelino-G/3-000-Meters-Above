
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
    <div>
      <header className="row">
        <h1 className="col-10">
          Game
        </h1>
        <section id="stats" className="col-2">
          <button onClick={resetGame} >
            Reset
          </button>
        </section>
      </header>
      <BattlefielCanvas enemies = {enemies}/>
      <div id="controls" className="row">
        <kbd className="col-1 offset-1 border">W</kbd>
        <div className="row border">
          <kbd className="col-1">A</kbd>
          <kbd className="col-1">S</kbd>
          <kbd className="col-1">D</kbd>
        </div>
      </div>
    </div>
  );
}

export default App;
