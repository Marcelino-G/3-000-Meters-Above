import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function DialogueCanvas(){
    class EnemyPlayer {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.vxr = 0;
            this.vxl = 0;
            this.vyu = 0;
            this.vyd = 0;
            this.switchh = false;
        }
        draw(color, context){
            this.ctx = context;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        xDirection(){
            if(this.x > 1200){
                this.switchh = !this.switchh;
            } else if(this.x < 5){
                this.switchh = !this.switchh;
            }
        }
    }

    const dialogueRef = useRef();
    const readyRef = useRef();
    const continueRef = useRef();
    const textFormRef = useRef();
    const radioFormRef = useRef();

    let [myGroup, setMyGroup] = useState(sessionStorage.getItem("playerGroup") === null? "" : sessionStorage.getItem("playerGroup"))
    let [myName, setMyName] = useState(sessionStorage.getItem("playerName") === null? "" : sessionStorage.getItem("playerName"))
    let [myAge, setMyAge] = useState(sessionStorage.getItem("playerAge") === null? "" : sessionStorage.getItem("playerAge"))
    
    const chapters =[
            [
                "Hello!",
                "Is anyone out there?",
                "Respond!",
                "Someone!",
                "I...",
                "Yes! I can hear you!",
                "Who do you fight for?!?",
                `... ${myGroup}`,
                "Okay.... can you still fly?",
                "... I think so",
                "Well strap in...",
                "HERE THEY COME!"
                
            ],
            [
                "Okay, you're still alive for now",
                "What is your name?",
                `... ${myName}`,
                "... What about yours?",
                "Nevermind that...",
                "We're about 3,000 meters above you",
                "Listen to me carefully",
                "... if you want to make it out alive",
                "Now, push forward!"
            ],
            [
                "You pilot that machine with ease...",
                "How old are you?",
                `... ${myAge}`,
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
                "Why do I know this name..."
            ],
            [
                `... ${myGroup}`,
                `... ${myName}`,
                `... ${myAge}`,
                "What is happening...",
                "We fight for the same cause...",
                "We have the same name... age...",
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
    let [dialogueLine, setDialogueLine] = useState(0);
    let [currentDialogue, setCurrentDialogue] = useState(chapters[chapterOrder][dialogueLine]);
    let [letter, setLetter] = useState(0)
    let [lineSwitch, setLineSwitch] = useState(false)
    let [posX, setPosX] = useState(115)
    let [posY, setPosY] = useState(95)
    
    const [enemies, setEnemies] = useState([new EnemyPlayer(Math.floor(Math.random() * 400),0,60,60)]);

    let context;
    let animationReq;

    useEffect(() => {
        updating.letters();
        if(currentDialogue === "Who do you fight for?!?"){
            radioFormRef.current.style.display = "block"
            continueRef.current.setAttribute("disabled", "")
        } else if(currentDialogue === "What is your name?" || currentDialogue === "How old are you?"){
            textFormRef.current.style.display = "block"
            continueRef.current.setAttribute("disabled", "")
        }
        if(currentDialogue === chapters[chapterOrder][chapters[chapterOrder].length-1]){
            readyRef.current.removeAttribute("disabled")
            continueRef.current.setAttribute("disabled", "")
            createEnemies();
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
                setPosX(115);
                cancelAnimationFrame(animationReq)
            } else{
                context.font = "30px serif"
                context.fillStyle = "#F5E9CF"
                context.fillText(currentDialogue[letter], posX, posY)
                setLetter(letter+= 1);
                if(currentDialogue[letter] === " "){
                    setPosX(posX+= 25);
                }else{
                    setPosX(posX+= 22);
                }
                
                animationReq = requestAnimationFrame(updating.letters)   
            }      
        },
        nextLineClick: function(){
            context = updating.start()
            context.clearRect(0,0,dialogueRef.current.width, dialogueRef.current.height)
            setLineSwitch(!lineSwitch)
        }
    }

    const createEnemies = () => {

        if(currentDialogue === chapters[5][chapters[5].length-1]){
            for(let i = 0; i < Math.floor(Math.random() * (300-275+1) + 275 ); i++){
                setEnemies((prev) => [
                    ...prev, new EnemyPlayer(Math.floor(Math.random() * (1215-0+1)+0),Math.floor(Math.random() * (300-5+1)+5),60,60)
                ])
            }
        } else {
            for(let i = 0; i < Math.floor(Math.random() * (40 - 25 + 1) + 25 ); i++){
                setEnemies((prev) => [
                    ...prev, new EnemyPlayer(Math.floor(Math.random() * (1175-0+1)+0),Math.floor(Math.random() * (175-5+1)+5),60,60)
                ])
            }
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
    }

    const handleSubmit = (e) => {

        setCurrentDialogue(chapters[chapterOrder][dialogueLine])
        textFormRef.current.style.display = "none"
        radioFormRef.current.style.display = "none"
        updating.nextLineClick();
        continueRef.current.removeAttribute("disabled")
        e.preventDefault();
    }

    return (<div id="dialogueHolder">
                <canvas width={1250} height={200} ref={dialogueRef}></canvas>
                
                <div className="row justify-content-end m-0">
                    <Link className="col-2" to={"game"} state={{enemies: enemies, playerName: myName, playerAge: myAge, playerGroup: myGroup, chapter: chapterOrder,}}>
                        <button ref={readyRef} disabled className="col-12">ready!</button>
                    </Link>
                    <button ref={continueRef} onClick={updating.nextLineClick} className="col-2">continue</button>
                </div>
                    
                <form onSubmit={handleSubmit} ref={textFormRef} id="textInput">
                    <input type="text" id="name" name="name" onChange={questionForm.answerOnChange} required></input>
                    <input  type="submit" value="submit"></input>
                </form>
                <form onSubmit={handleSubmit} ref={radioFormRef} id="radio" onChange={questionForm.answerOnChange} className='row g-2'>
                        <div className="radioHolder">
                            <input type="radio" name='group' id="NORA" value="Nora" required></input>
                            <label htmlFor='NORA' >NORA</label>
                        </div>
                        <div className="radioHolder">
                            <input type="radio" name='group' id="Avalanche" value="Avalanche"></input>
                            <label htmlFor='Avalanche'>Avalanche</label>
                        </div>
                        <div className="radioHolder">
                            <input type="radio" name='group' id="Sanc Kingdom" value="Sanc Kingdom" ></input>
                            <label htmlFor='Sanc Kingdom' >Sanc Kingdom</label>
                        </div>
                        <input  type="submit" value="submit" className="col-1"></input>
                </form>
                
                <Outlet/>
        </div>)
}

export default DialogueCanvas;