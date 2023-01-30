import { useEffect, useRef } from "react"
import { useState } from "react"
import React from "react";
import { Link } from "react-router-dom";
import DialogueCanvas from "./DialogueCanvas";

function BattlefielCanvas(props) {

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

        updatePosition(){
            if(this.x <= 5){
                this.x += 2;
                return
            } else if(this.x >= 445){
                this.x -= 2;
                return
            } else if(this.y <= 5){
                this.y += 2;
                return
            } else if (this.y > 235){
                this.y -= 2;
                return
            }
            this.x += this.vxr;
            this.x += this.vxl;
            this.y += this.vyu;
            this.y += this.vyd;

            if (this.y === 20){
                return(
                    <DialogueCanvas/>
                )
                
            }
        }

        enemyPosition(x){
            this.y += x;
        }

        crash(enemy){
            //bottom right
            if(this.x > enemy.x && this.x < enemy.x + 30 && this.y > enemy.y && this.y < enemy.y + 30){
                alert("bye")
                
                console.log(myPlayer)
                return true;
            } 
            //top left
            if(this.x < enemy.x && this.x > enemy.x - 30 && this.y < enemy.y && this.y > enemy.y - 30){
                alert("bye")
                
                console.log(myPlayer)
                return true;
            } 
            //top right
            if(this.x > enemy.x && this.x < enemy.x + 30 && this.y < enemy.y && this.y > enemy.y - 30){
                alert("bye")
                
                console.log(myPlayer)
                return true;
            } 
            //bottom left
            if(this.x < enemy.x && this.x > enemy.x - 30 && this.y > enemy.y && this.y < enemy.y + 30){
                alert("bye")
                
                console.log(myPlayer)
                return true;
            } 
        }
    }



    const canvasRef = useRef();
    let canvasContext;
    let myPlayer;
    // const [en, setEn] = useState([new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30), new Player(0,0,30,30)]);
    // const [en, setEn] = useState([new Player(Math.floor(Math.random() * 400),0,40,40)]);

    useEffect(() => {
        console.log(props.level)
        myGameArea.start();
        myGameArea.updatingGame();
    },[])

    
    const addingEnemy = () => {
        // for(let i = 0; i < level; i++){
        //     setEn((prev) => [
        //         ...prev, new Player(Math.floor(Math.random() * 400),0,50,40)
        //     ])
        // }
        // for(let i = 0; i < en.length; i++){
        //     en[i].x = Math.floor(Math.random() * 400)
        // }
    }

    

    const myGameArea = {
        start: function() {
            console.log(props.man)
            canvasContext = canvasRef.current.getContext("2d");
            myPlayer = new Player(100,200,30,30)

        //     for(let i = 0; i < props.level[1]; i++){
        //     setEn((prev) => [
        //         ...prev, new Player(Math.floor(Math.random() * 400),0,50,40)
        //     ])
        // }
            // enemy = new Player(0,0,30,30)
            // enemy.x = Math.floor(Math.random() * 400)
            // en.x= Math.floor(Math.random() * 400)
        },
        updatingGame: function(){
            
            // for(let i =0; i < en.length; i++){
            
            //     en[i].x= Math.floor(Math.random() * 360)
            //     en[i].y= Math.floor(Math.random() * 25)
            // }
            
            updateGameArea();
            
        },
        clearCanvas: function(){
            canvasContext.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        },
    }

    

    const updateGameArea = () => {
        myGameArea.clearCanvas();
        myPlayer.updatePosition();
        // en[0].enemyPosition();

        

        myPlayer.draw("yellow", canvasContext);
        // en[0].draw('red',canvasContext)

        let req = requestAnimationFrame(updateGameArea)

        for(let i =0; i < props.enemies.length; i++){
            
            props.enemies[i].enemyPosition(Math.floor(Math.random() * 1.5));
            props.enemies[i].draw('red',canvasContext)
            

            if(myPlayer.crash(props.enemies[i])){
                cancelAnimationFrame(req)
            }
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "d"){
            myPlayer.vxr = 1.75;
            
        }
        if(e.key === "a"){
            // console.log(en)
            myPlayer.vxl = -1.75;
            
        }
        if (e.key === "w"){
            myPlayer.vyu = -1.75;
        }
        if (e.key === "s"){
            myPlayer.vyd = 1.75;
        }
    })

    document.addEventListener("keyup", (e) => {
        if(e.key === "d"){
            myPlayer.vxr = 0;
        }
        if(e.key === "a"){
            myPlayer.vxl = 0;
        }
        if(e.key === "w"){
            myPlayer.vyu = 0;
        }
        if(e.key === "s"){
            myPlayer.vyd = 0;
        }
    })

    

    return (
        <div>
            <canvas width={480} height={270} ref={canvasRef}>
            </canvas>
        </div>
    );
    
}

export default BattlefielCanvas;

