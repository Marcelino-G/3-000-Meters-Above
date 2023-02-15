import { useEffect, useRef } from "react"

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BattlefielCanvas(props) {

    const navigate = useNavigate();

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

            

            if (this.y < 15){
                
                
                navigate('/')
                
                
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
  

    useEffect(() => {
        console.log(props.level)
        myGameArea.start();
        myGameArea.updatingGame();
    },[])

    
  

    

    const myGameArea = {
        start: function() {
            console.log(props.man)
            canvasContext = canvasRef.current.getContext("2d");
            myPlayer = new Player(100,200,30,30)

       
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
        

        

        myPlayer.draw("yellow", canvasContext);

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

