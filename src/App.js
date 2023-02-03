// import logo from './logo.svg';
// import './App.css';
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BattlefielCanvas from "./BattlefieldCanvas";



function App(props) {

  const location = useLocation();
  const {enemies} = location.state
  
  const {playerName} = location.state
  let {g} = location.state

  let newf = parseInt(g) + 1;

  sessionStorage.setItem("chapter", newf)

  const lll = () => {

    console.log(`session: ${sessionStorage.getItem('chapter')}`)
    console.log(`g: ${typeof(g)}`)
    console.log(`newf: ${typeof(newf)}`)
  }

  

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
              <button onClick={lll}>

              </button>
            </li>
          </ul>
        </section>
      </header>
      <BattlefielCanvas enemies = {enemies}/>
    </div>
  );
}

export default App;
