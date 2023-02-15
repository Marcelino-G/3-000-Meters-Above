import { useNavigate } from "react-router-dom";

function ErrorPage(){


    const navigate = useNavigate();

    const resetGame = () => {
        sessionStorage.clear();
        navigate("/")
      }


return(<div>
    <h1>
        Oops!
    </h1>
    <p>
        I Am ErRoR... embarrassing...
    </p>
    <button onClick={resetGame} >
        reset
    </button>
</div>)





}

export default ErrorPage;