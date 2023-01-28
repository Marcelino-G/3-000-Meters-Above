import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function DialogueCanvas(){

    const dialogueRef = useRef();
    const nameFormRef = useRef();
    const readyRef = useRef();
    const continueRef = useRef();


    let [myName, setMyName] = useState("")
    const chapterOne = [
        "is anyone out there?",
        "yes! Help",
        "what's your name?",
        `does this work ${myName}?`,
        "dont u worry",
        "the saws are on their way",
        "are you ready?"
    ]

    let [pos, setPos] = useState(285)
    let [letter, setLetter] = useState(0)
    let [dialogueLine, setDialogueLine] = useState(0);
    let [currentDialogue, setCurrentDialogue] = useState(chapterOne[dialogueLine]);
    let [my, setMy] = useState(false)
    
    let context;
    let req;

    useEffect(() => {
        
        updating.letters();
        if(currentDialogue === chapterOne[2]){
            nameFormRef.current.style.display = "flex"
            continueRef.current.setAttribute("disabled", "")
        }
        if(currentDialogue === chapterOne[6]){
            readyRef.current.removeAttribute("disabled")
            continueRef.current.setAttribute("disabled", "")
        }
    },[my]);

    const updating = {

        start: function(){
            return context = dialogueRef.current.getContext('2d')
        },
        letters: function(){
            context = updating.start()
            if(letter === currentDialogue.length){
                setDialogueLine(dialogueLine+= 1)
                setCurrentDialogue(chapterOne[dialogueLine])
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
            setMy(!my)
        }
    }

    const form = {

        nameOnChange: function(e){
            setMyName(e.target.value)
        },
        nameSubmit: function(e){
            e.preventDefault();
            setCurrentDialogue(chapterOne[dialogueLine])
            nameFormRef.current.style.display = "none"
            updating.nextLineClick();
            continueRef.current.removeAttribute("disabled")
        }
    }

    return (<div id="dialogueHolder" className="row justify-content-end">
                <canvas width={900} height={350}  ref={dialogueRef}></canvas>
                
                    
                    <Link to={"s"}>
                        <button ref={readyRef} className="col-2" disabled>ready!</button>
                    </Link>
                <button ref={continueRef} className="col-2" onClick={updating.nextLineClick}>continue</button>
                <form ref={nameFormRef}>
                    <label htmlFor="name">Name?</label>
                    <input type="text" id="name" name="name" onChange={form.nameOnChange}></input>
                    <input  type="submit" onClick={form.nameSubmit} ></input>
                </form>
                <Outlet/>
        
        </div>)
}

export default DialogueCanvas;