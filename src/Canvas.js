import { useEffect, useRef } from "react"
import { useState } from "react"
import React from "react";

function Canvas() {

    const canvasRef = useRef();
    let canvasContext;
    let myPlayer;
    let enemy;

    useEffect(() => {
        myGameArea.start();
        myGameArea.updatingGame();
    },[])

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
        }

        enemyPosition(){
            this.y += .1;
        }

        crash(enemy){
            //bottom right
            if(this.x > enemy.x && this.x < enemy.x + 30 && this.y > enemy.y && this.y < enemy.y + 30){
                alert("bye")
                return true;
            } 
            //top left
            if(this.x < enemy.x && this.x > enemy.x - 30 && this.y < enemy.y && this.y > enemy.y - 30){
                alert("bye")
                return true;
            } 
            //top right
            if(this.x > enemy.x && this.x < enemy.x + 30 && this.y < enemy.y && this.y > enemy.y - 30){
                alert("bye")
                return true;
            } 
            //bottom left
            if(this.x < enemy.x && this.x > enemy.x - 30 && this.y > enemy.y && this.y < enemy.y + 30){
                alert("bye")
                return true;
            } 
        }
    }

    const myGameArea = {
        start: function() {
            canvasContext = canvasRef.current.getContext("2d");
            myPlayer = new Player(10,120,30,30)
            enemy = new Player(0,0,30,30)
            enemy.x = Math.floor(Math.random() * 400)
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
        enemy.enemyPosition();

        

        myPlayer.draw("yellow", canvasContext);
        enemy.draw('red',canvasContext)


        let req = requestAnimationFrame(updateGameArea)

        if(myPlayer.crash(enemy)){
            cancelAnimationFrame(req)
        }

    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "d"){
            myPlayer.vxr = 1.75;
        }
        if(e.key === "a"){
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

export default Canvas;

