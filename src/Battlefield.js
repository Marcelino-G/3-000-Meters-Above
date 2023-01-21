import { useEffect, useRef } from "react"
import { useState } from "react"
import React from "react";

function Canvas() {

    const canvas = useRef();
    let canvasContext;

    useEffect(() => {
        canvasContext = canvas.current.getContext("2d")
        startGame();
    },[])

    const startGame = () => {
        console.log(canvasContext)
        let myPlayer = new Component(10,120,30,30).update("blue", canvasContext) 
    }

    class Component {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        update(color, context){
            this.ctx = context;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    

    return (
        <div>
            <canvas width={480} height={270} ref={canvas}>

            </canvas>
        </div>
    );
}

export default Canvas;

