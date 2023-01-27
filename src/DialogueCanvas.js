import { useEffect, useRef, useState } from "react";

function DialogueCanvas(){

    const dialogue = useRef()
    const nameForm = useRef()

    let [myName, setMyName] = useState("")
    const chapterOne = [
        "is anyone out there?",
        "yes! Help",
        "whats your name?",
        `does this work ${myName}?`,
        "dont u worry",
        "the saws are ontheir way"
    ]

    let [pos, setPos] = useState(50)
    let [letter, setLetter] = useState(0)
    let [dialogueLine, setDialogueLine] = useState(0);
    let [currentDialogue, setCurrentDialogue] = useState(chapterOne[dialogueLine]);
    let [my, setMy] = useState(false)
    
    
    let context;
    let req;

    useEffect(() => {
        
        // context = dialogue.current.getContext('2d')
        // updateLetter();
        // updateLetter();
        updating.start();
        updating.letter();
        if(currentDialogue === chapterOne[2]){
            nameForm.current.style.display = "block"
        }
    },[my]);

    const updating = {

        start: function(){
            return context = dialogue.current.getContext('2d')
        },

        letter: function(){
            context = updating.start()
            if(letter === currentDialogue.length){
                setDialogueLine(dialogueLine+= 1)
                setCurrentDialogue(chapterOne[dialogueLine])
                setLetter(0);
                setPos(50);
                console.log("done")
                cancelAnimationFrame(req)
            } else{
                context.fillText(currentDialogue[letter], pos, 50)
                setLetter(letter+= 1);
                setPos(pos+=5);
                console.log("working")
                req = requestAnimationFrame(updating.letter)   
            }
    
             
        },
        nextLineClick: function(){
            context = updating.start()
            context.clearRect(0,0,dialogue.current.width, dialogue.current.height)
            setMy(!my)
        }




    }

    // const updateLetter = () => {

    //     if(letter === currentDialogue.length){
    //         setDialogueLine(dialogueLine++)
    //         cancelAnimationFrame(req)
    //     }

    //     context.fillText(currentDialogue[letter], pos, 50)
    //     setLetter(letter++);
    //     setPos(pos+=5);
    //     let req = requestAnimationFrame(updateLetter)

        

    // }

    


    // const updateLetter = () => {

    //     if(letter === currentDialogue.length){
    //         cancelAnimationFrame(req)
    //     }

    //     // context.fillText(currentDialogue[letter], pos, 50)
    //     // setLetter(letter++)
    //     // setPos(pos+5)
    //     let req = requestAnimationFrame(updateLetter)
    //     console.log(currentDialogue[letter])

        
    // }

    // const nextLine = () => {
    //     // setDialogueLine(dialogueLine++)
    //     // setCurrentDialogue(chapterOne[dialogueLine])
    //     context.clearRect(0,0,dialogue.current.width, dialogue.current.height)
    //     setCurrentDialogue(chapterOne[dialogueLine])
    // }

    const nameOnChange = (e) => {
        setMyName(e.value)
        console.log(myName)
    }

    const nameSubmit = (e) => {
        e.preventDefault();
        nameForm.current.style.display = "none"
        updating.letter();
        updating.nextLineClick();
    }

    return (<div>
        <canvas width={200} height={200} ref={dialogue}></canvas>
        <form ref={nameForm}>
            <label htmlFor="name">Name?</label>
            <input type="text" id="name" name="name" onChange={nameOnChange}></input>
            <input type="submit" onClick={nameSubmit} ></input>
        </form>
        <button onClick={updating.nextLineClick}></button>
    </div>)
}

export default DialogueCanvas;