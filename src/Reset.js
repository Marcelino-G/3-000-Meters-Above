import { useNavigate } from "react-router-dom";

function Reset (){

    const navigate = useNavigate();

    const resetGame = () => {
        sessionStorage.clear();
        navigate("/")
        console.log('sas')
      }


      return(<div>

        <button onClick={resetGame} >
            Reset
          </button>

      </div>)




}

export default Reset;


