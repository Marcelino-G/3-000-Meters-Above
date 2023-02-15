import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function DialogueCanvas(){
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
    const questionFormRef = useRef();
    const readyRef = useRef();
    const continueRef = useRef();
    const textFormRef = useRef();
    const radioFormRef = useRef();


    let [myName, setMyName] = useState("")
    let [myAge, setMyAge] = useState("")
    let [myGroup, setMyGroup] = useState("")
    


    const chapters =[
            [
                "Hello!",
                "Is anyone out there?!",
                "Respond!",
                "Someone!",
                "I...",
                "Yes! I can hear you!",
                "Who do you fight for?!?",
                `...${myGroup}`,
                "Okay.... can you still fly?",
                "...I think so",
                "You have no choice if you want to survive because here they come!",
                "Are you ready?"
                
            ],
            [
                "Okay, you're still alive for now",
                "What is your name?",
                `...${myName}`,
                "...What about yours?",
                "Nevermind that, we're about 3,000 meters above you",
                "You'll have to listen to my every command if you want to make it out alive",
                "Now, push forward!"
            ],
            [
                "You really know how to pilot that machine dont you",
                "How old are you?",
                `...${myAge}`,
                "Hmm... that's the same age when I...",
                "ANOTHER ATTACK!",
                "PUSH!!!"
            ],
            [
                "THERE'S TOO MANY OF THEM!",
                "KID! YOU GOT TO MAKE IT OUT OF THIS!",
                "YOU GOT TO MAKE IT BACK...",
                "BACK TO RELENA!",
                "Relena... who is that...",
                "Why do I know this..."
            ],
            [
                `...${myGroup}`,
                `...${myName}`,
                `...${myAge}`,
                "What is happening...",
                "We fight for the same cause...",
                "We have the same name... same age...",
                "KID! CAN YOU HEAR ME?!",
                "I LOST TRACK OF YOU!",
                "WHERE ARE YOU?!"
            ],
            [
                "...",
                "That's when I realized...",
                "I never made it back to Relena...",
                "Over and over again...",
                "I never made it back..."
            ]

    ]

    let [chapterOrder, setChapterOrder] = useState(sessionStorage.getItem("chapter") === null? 0 : parseInt(sessionStorage.getItem("chapter")) );
    let [pos, setPos] = useState(285)
    let [letter, setLetter] = useState(0)
    let [dialogueLine, setDialogueLine] = useState(0);
    let [currentDialogue, setCurrentDialogue] = useState(chapters[chapterOrder][dialogueLine]);
    let [lineSwitch, setLineSwitch] = useState(false)

    const [en, setEn] = useState([new Player(Math.floor(Math.random() * 400),0,40,40)]);

    
    let context;
    let req;

    useEffect(() => {
        updating.letters();
        if(currentDialogue === "Who do you fight for?!?"){
            // questionFormRef.current.style.display = "flex"
            radioFormRef.current.style.display = "block"
            continueRef.current.setAttribute("disabled", "")
        } else if(currentDialogue === "What is your name?" || currentDialogue === "How old are you?"){
            // questionFormRef.current.style.display = "flex"
            textFormRef.current.style.display = "block"
            continueRef.current.setAttribute("disabled", "")
        }
        if(currentDialogue === chapters[chapterOrder][chapters[chapterOrder].length-1]){
            readyRef.current.removeAttribute("disabled")
            continueRef.current.setAttribute("disabled", "")
        }
    },[lineSwitch]);

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

    const createEnemies = () => {
             for(let i = 0; i < Math.floor(Math.random() * (12 - 3 + 1) + 3 ); i++){
                console.log(i)
                    setEn((prev) => [
                        ...prev, new Player(Math.floor(Math.random() * 400),0,50,40)
                    ])
        }
    }

    const questionForm = {

        answerOnChange: function(e){
            if(chapterOrder === 0){
                setMyGroup(e.target.value)
            } else if(chapterOrder === 1){
                setMyName(e.target.value)
            } else if(chapterOrder === 2){
                setMyAge(e.target.value)
            }
              
        },
        answerSubmit: function(e){

            
            

            // if(e.target.previousElementSibling.value === "" || myGroup === ""){
            //     return
            // } else{
            //     setCurrentDialogue(chapters[chapterOrder][dialogueLine])
            //     questionFormRef.current.style.display = "none"
            //     updating.nextLineClick();
            //     continueRef.current.removeAttribute("disabled")
            //     createEnemies();
            //     e.preventDefault();
            // }
            
            
        }
    }

    const handleSubmit = (e) => {


        setCurrentDialogue(chapters[chapterOrder][dialogueLine])
        textFormRef.current.style.display = "none"
        radioFormRef.current.style.display = "none"
        updating.nextLineClick();
        continueRef.current.removeAttribute("disabled")
        createEnemies();
        e.preventDefault();
    }

    

    return (<div id="dialogueHolder" className="row justify-content-end">
                <canvas width={900} height={350}  ref={dialogueRef}></canvas>
                
                    
                    <Link to={"s"} state={{enemies: en, playerName: myName, g: chapterOrder}}  className="col-2">
                        <button ref={readyRef} disabled>ready!</button>
                    </Link>
                <button ref={continueRef} className="col-2" onClick={updating.nextLineClick}>continue</button>
                {/* <form ref={questionFormRef}  >
                    <div  >
                        <input type="text" id="name" name="name" onChange={questionForm.answerOnChange} required></input>
                    </div>
                    <div ref={radioFormRef} id="radio" onChange={questionForm.answerOnChange}>
                        <input type="radio" name='group' id="NORA" value="Nora" required></input>
                        <label htmlFor='Nora' >NORA</label>
                        <input type="radio" name='group' id="Avalanche" value="Avalanche"></input>
                        <label htmlFor='Avalanche'>Avalanche</label>
                        <input type="radio" name='group' id="Sanc Kingdom" value="Sanc Kingdom" ></input>
                        <label htmlFor='Sanc Kingdom' >Sanc Kingdom</label>
                    </div>
                    <input  type="submit" onSubmit={questionForm.answerSubmit} ></input>
                </form> */}
                <form onSubmit={handleSubmit} ref={textFormRef} id="textInput">
                    <input type="text" id="name" name="name" onChange={questionForm.answerOnChange} required></input>
                    <input  type="submit" value="submit"></input>
                </form>
                <form onSubmit={handleSubmit} ref={radioFormRef} id="radio" onChange={questionForm.answerOnChange}>
                        <input type="radio" name='group' id="NORA" value="Nora" required></input>
                        <label htmlFor='Nora' >NORA</label>
                        <input type="radio" name='group' id="Avalanche" value="Avalanche"></input>
                        <label htmlFor='Avalanche'>Avalanche</label>
                        <input type="radio" name='group' id="Sanc Kingdom" value="Sanc Kingdom" ></input>
                        <label htmlFor='Sanc Kingdom' >Sanc Kingdom</label>
                        <input  type="submit" value="submit"></input>
                </form>
                
                <Outlet/>
        
        </div>)
}

export default DialogueCanvas;