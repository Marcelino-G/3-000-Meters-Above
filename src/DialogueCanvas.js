import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function DialogueCanvas(){

    // const navigate = useNavigate();

    class Player {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.vxr = 0;
            this.vxl = 0;
            this.vyu = 0;
            this.vyd = 0;
        }

        draw(color, context){
            this.ctx = context;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        enemyPosition(x){
            this.y += x;
        }
    }


    const dialogueRef = useRef();
    const nameFormRef = useRef();
    const readyRef = useRef();
    const continueRef = useRef();


    let [myName, setMyName] = useState("")
    let [myAge, setMyAge] = useState("")
    


    const chapters =[
            [
                "Is anyone out there?",
                "Can anyone hear me?",
                "Respond! Someone!",
                "I...",
                "Yes! What is your name?",
                `... ${myName}`,
                "What about yours?",
                "Nevermind that. Can you still fly?",
                "... I think so",
                "Well prepare yourself because here they come",
                "Are you ready?"
            ],
            [
                "I'm back",
                "how old are you?",
                `${myAge}`,
                "nice",
                "... you ready?"
            ],
            [
                "oh yeah",
                "now its working"
            ],
            [
                "dis is what I am talking about",
                "no problemo"
            ]
    ]

    let [chapterOrder, setChapterOrder] = useState(sessionStorage.getItem("chapter") === null? 0 : parseInt(sessionStorage.getItem("chapter")) );

    let [pos, setPos] = useState(285)
    let [letter, setLetter] = useState(0)
    let [dialogueLine, setDialogueLine] = useState(0);
    let [currentDialogue, setCurrentDialogue] = useState(chapters[chapterOrder][dialogueLine]);
    let [lineSwitch, setLineSwitch] = useState(false)

    
    let context;
    let req;

    // useEffect(() => {
    //     context = updating.start()
    //     context.clearRect(0,0,dialogueRef.current.width, dialogueRef.current.height)
    // },[])

    useEffect(() => {
        updating.letters();
        console.log(chapterOrder)
        if(currentDialogue === "Yes! What is your name?" || currentDialogue === "how old are you?"){
            nameFormRef.current.style.display = "flex"
            continueRef.current.setAttribute("disabled", "")
        }
        if(currentDialogue === chapters[chapterOrder][chapters[chapterOrder].length-1]){
            readyRef.current.removeAttribute("disabled")
            continueRef.current.setAttribute("disabled", "")
        }
    },[lineSwitch]);

    // useEffect(() => {

    //     if(sessionStorage.getItem('chapter') === null){
    //         console.log("man")
    //         return
    //     } else {
    //         setChapterOrder(sessionStorage.getItem('chapter'))
    //         console.log(sessionStorage.getItem("chapter"))
    //         console.log("hey")
    //     }
    // },[])

    // useEffect(() => {
    //     updating.nextLineClick()
    // }, [chapterOrder])

    




    const updating = {

        start: function(){
            return context = dialogueRef.current.getContext('2d')
        },
        letters: function(){
            context = updating.start()
            if(letter === currentDialogue.length){
                setDialogueLine(dialogueLine+= 1)
                setCurrentDialogue(chapters[chapterOrder][dialogueLine])
                setLetter(0);
                setPos(275);
                cancelAnimationFrame(req)
            } else{
                context.font = "25px serif"
                context.fillText(currentDialogue[letter],pos, 225)
                context.textAlign = "center"
                setLetter(letter+= 1);
                if(currentDialogue[letter] === " "){
                    setPos(pos+= 10);
                } else{
                    setPos(pos+= 15);
                }
                
                req = requestAnimationFrame(updating.letters)   
            }
    
             
        },
        nextLineClick: function(){
            context = updating.start()
            context.clearRect(0,0,dialogueRef.current.width, dialogueRef.current.height)
            setLineSwitch(!lineSwitch)
        }
    }

    const [en, setEn] = useState([new Player(Math.floor(Math.random() * 400),0,40,40)]);

    const createEnemies = () => {
             for(let i = 0; i < Math.floor(Math.random() * (12 - 3 + 1) + 3 ); i++){
                console.log(i)
                    setEn((prev) => [
                        ...prev, new Player(Math.floor(Math.random() * 400),0,50,40)
                    ])
        }
    }

    const form = {

        nameOnChange: function(e){
            if(chapterOrder === 0){
                console.log(e.target.value)
                setMyName(e.target.value)
            } else if(chapterOrder === 1){
                console.log(e.target.value)
                setMyAge(e.target.value)
            }
            
            
        },
        nameSubmit: function(e){

            if(e.target.previousElementSibling.value === ""){
                return
            } else{
                setCurrentDialogue(chapters[chapterOrder][dialogueLine])
                nameFormRef.current.style.display = "none"
                updating.nextLineClick();
                continueRef.current.removeAttribute("disabled")
                createEnemies();
                e.preventDefault();
            }
            console.log(myAge)
            console.log(myName)
            
        }
    }

    // const readE = () => {
    //     context = updating.start()
    //     context.clearRect(0,0,dialogueRef.current.width, dialogueRef.current.height)
    //     navigate("s")
    // }

    return (<div id="dialogueHolder" className="row justify-content-end">
                <canvas width={900} height={350}  ref={dialogueRef}></canvas>
                
                    
                    <Link to={"s"} state={{enemies: en, playerName: myName, g: chapterOrder}}  className="col-2">
                        <button ref={readyRef} disabled>ready!</button>
                    </Link>
                <button ref={continueRef} className="col-2" onClick={updating.nextLineClick}>continue</button>
                <form ref={nameFormRef}>
                    <label htmlFor="name">Name?</label>
                    <input type="text" id="name" name="name" onChange={form.nameOnChange} required></input>
                    <input  type="submit" onClick={form.nameSubmit} ></input>
                </form>
                <Outlet/>
        
        </div>)
}

export default DialogueCanvas;