// import logo from './logo.svg';
// import './App.css';
import { Link, useLocation } from "react-router-dom";
import BattlefielCanvas from "./BattlefieldCanvas";



function App(props) {

  const location = useLocation();
  const {enemies} = location.state
  
  const {playerName} = location.state
  console.log(playerName)

  return (
    <div>
      <header className="row">
        <h1 className="col-10">
          Game
        </h1>
        <section id="stats" className="col-2">
          <ul>
            <li>
              <Link to={"/"} >
                <button>
                  Next
                </button>
              </Link>
            </li>
            <li>
              Name: {playerName}
            </li>
            <li>
              Level:
            </li>
            <li>
              Score:
            </li>
          </ul>
        </section>
      </header>
      <BattlefielCanvas enemies = {enemies}/>
    </div>
  );
}

export default App;
