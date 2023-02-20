import { useNavigate } from "react-router-dom";

function Reset (){

    const navigate = useNavigate();

    const resetGame = () => {
        sessionStorage.clear();
        navigate("/game")
      }

      return(<div className='col-1'>
        <button className="p-1" onClick={resetGame} >
            Reset
          </button>
      </div>)
}

export default Reset;


