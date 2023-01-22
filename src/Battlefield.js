import { useEffect, useRef } from "react"
import { useState } from "react"
import React from "react";

function Canvas() {

    const canvasRef = useRef();
    let canvasContext;
    let myPlayer;

    useEffect(() => {
        myPlayer = new Player(10,120,30,30)
        myGameArea.start();
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

        updateDrawing(color, context){
            this.ctx = context;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        updatePosition(){
            this.x += this.vxr;
            this.x += this.vxl;
            this.y += this.vyu;
            this.y += this.vyd;
        }
    }

    const myGameArea = {
        start: function() {
            canvasContext = canvasRef.current.getContext("2d");
            // let updateInterval = setInterval(updateGameArea, 20);
            updateGameArea();
        },
        clearCanvas: function(){
            canvasContext.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        },
    }

    const updateGameArea = () => {
        myGameArea.clearCanvas();
        myPlayer.updatePosition();
        myPlayer.updateDrawing("yellow", canvasContext);
        requestAnimationFrame(updateGameArea)
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

