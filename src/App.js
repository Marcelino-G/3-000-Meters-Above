
import { Link, useLocation } from "react-router-dom";
import BattlefielCanvas from "./BattlefieldCanvas";
import { useNavigate } from "react-router-dom";



function App(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const {enemies} = location.state;
  
  const {playerName} = location.state
  let {g} = location.state

  let newf = parseInt(g) + 1;

  sessionStorage.setItem("chapter", newf)

  const lll = () => {

    console.log(`session: ${sessionStorage.getItem('chapter')}`)
    console.log(`g: ${typeof(g)}`)
    console.log(`newf: ${typeof(newf)}`)
  }

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
    </div>
  );
}

export default App;
