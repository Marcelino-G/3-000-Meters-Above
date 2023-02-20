import { useEffect, useRef, useState } from "react"
import React from "react";
import { useNavigate } from "react-router-dom";

function BattlefielCanvas(props) {

    const navigate = useNavigate();
    class MainPlayer {
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
            } else if(this.x >= 1215){
                this.x -= 2;
                return
            } else if(this.y <= 5){
                this.y += 2;
                return
            } else if (this.y > 590){
                this.y -= 2;
                return
            }
            this.x += this.vxr;
            this.x += this.vxl;
            this.y += this.vyu;
            this.y += this.vyd;

            if (this.y < 15){
                navigate('/game')
            }
        }

        crash(enemy){
            //bottom right
            if(this.x > enemy.x && this.x < enemy.x + 55 && this.y > enemy.y && this.y < enemy.y + 55){
                return true
            } 
            //top left
            if(this.x < enemy.x && this.x > enemy.x - 40 && this.y < enemy.y && this.y > enemy.y - 40){
                return true
            } 
            //top right
            if(this.x > enemy.x && this.x < enemy.x + 55 && this.y < enemy.y && this.y > enemy.y - 55){
                return true
            } 
            //bottom left
            if(this.x < enemy.x && this.x > enemy.x - 40 && this.y > enemy.y && this.y < enemy.y + 40){
                return true
            } 
        }
    }

    const canvasRef = useRef();
    let canvasContext;
    let myPlayer;

    useEffect(() => {
        myGameArea.start();
        myGameArea.updatingGame();
    },[])

    const myGameArea = {
        start: function() {
            canvasContext = canvasRef.current.getContext("2d");
            myPlayer = new MainPlayer(590,555,35,35)
        },
        updatingGame: function(){
            updateGameArea();
        },
        clearCanvas: function(){
            canvasContext.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        },
    }

    const updateGameArea = () => {
        myGameArea.clearCanvas();
        myPlayer.updatePosition();
        myPlayer.draw("blue", canvasContext);
        let animationReq = requestAnimationFrame(updateGameArea)

        for(let i =0; i < props.enemies.length; i++){
            
            props.enemies[i].xDirection();

            if(props.enemies[i].switchh){
                props.enemies[i].x -= 7.5;
            } else {
                props.enemies[i].x += 7.5;
            }

            props.enemies[i].y += .10;
            props.enemies[i].draw('orange',canvasContext)
            
            if(myPlayer.crash(props.enemies[i])){
                cancelAnimationFrame(animationReq)
                
                if(props.chapter === 5){
                    navigate('/game/play/youlose')
                }
            }
        }
    }

    document.addEventListener("keydown", (e) => {
        
        if (e.key === "d"){
            myPlayer.vxr = 2.5;
        }
        if(e.key === "a"){
            myPlayer.vxl = -2.5;
        }
        if (e.key === "w"){
            myPlayer.vyu = -2.5;
        }
        if (e.key === "s"){
            myPlayer.vyd = 2.5;
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
        <div id='battlefieldHolder'>
            <canvas width={1250} height={625} ref={canvasRef}></canvas>
        </div>
    );
}

export default BattlefielCanvas;

