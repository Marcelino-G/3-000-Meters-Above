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
                
                
                navigate('/')
                
                
            }
        }

        enemyPosition(x){
            this.y += x;
        }

        crash(enemy){
            //bottom right
            if(this.x > enemy.x && this.x < enemy.x + 59 && this.y > enemy.y && this.y < enemy.y + 59){
                
                
                console.log(myPlayer)
                
            } 
            //top left
            if(this.x < enemy.x && this.x > enemy.x - 59 && this.y < enemy.y && this.y > enemy.y - 59){
                
                
                console.log(myPlayer)
                
            } 
            //top right
            if(this.x > enemy.x && this.x < enemy.x + 59 && this.y < enemy.y && this.y > enemy.y - 59){
               
                
                console.log(myPlayer)
                
            } 
            //bottom left
            if(this.x < enemy.x && this.x > enemy.x - 59 && this.y > enemy.y && this.y < enemy.y + 59){
                
                
                console.log(myPlayer)
                
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
            myPlayer = new Player(590,555,35,35)

            // for(let i =0; i < props.enemies.length; i++){
            
            //     props.enemies[i].enemyPosition(Math.floor(Math.random() * (13-3+1) + 3));
            // }
            console.log(props.enemies)

       
        },
        updatingGame: function(){
            
            
            
            updateGameArea();
            
        },
        clearCanvas: function(){
            canvasContext.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        },
    }

    let switchh = false; 
    

    const updateGameArea = () => {
        myGameArea.clearCanvas();
        myPlayer.updatePosition();
        

        

        myPlayer.draw("blue", canvasContext);

        let req = requestAnimationFrame(updateGameArea)

        for(let i =0; i < props.enemies.length; i++){
            
            // props.enemies[i].enemyPosition(Math.floor(Math.random() * (2-.5+1) + .5));
            if(props.enemies[i].x > 1200){
                switchh = !switchh;
            } else if(props.enemies[i].x < 5){
                switchh = !switchh
            }


            if(switchh){
                props.enemies[i].x -= .45;
            } else {
                props.enemies[i].x += .45;
            }


            props.enemies[i].y += .15;
            // props.enemies[i].x += .25;
            props.enemies[i].draw('red',canvasContext)
            

            if(myPlayer.crash(props.enemies[i])){
                cancelAnimationFrame(req)
            }
        }
    }

    document.addEventListener("keydown", (e) => {
        
        if (e.key === "d"){
            myPlayer.vxr = 5;
            
        }
        if(e.key === "a"){
            myPlayer.vxl = -5;
            
        }
        if (e.key === "w"){
            myPlayer.vyu = -5;
        }
        if (e.key === "s"){
            myPlayer.vyd = 5;
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

