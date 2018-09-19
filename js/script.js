"use strict";

//----------------------------Functions---------------------------------------//

function getMousePos(event){
  let mouseX = event.layerX - event.currentTarget.offsetLeft;
  let mouseY = event.layerY - event.currentTarget.offsetTop;

  return{
    "x": mouseX,
    "y": mouseY
  };
}

function reDrawCanvas(mousePos,canvas,token,ctx,board,tokens_number){
  let newToken = new Circle(mousePos.x,mousePos.y,token.getRadio(),token.getColor());
  ctx.clearRect(token.getParamX,token.getParamY,30,30);
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.restore();
  board.draw(ctx);
  drawTokensCounter(tokens_number,ctx);
  newToken.draw(ctx);
}

function drawTokensCounter(tokens_number,ctx){
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillText(tokens_number,10,35);
}

window.onload = function(){
  //--------------------------Inicialize variables----------------------------//
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let drag = false;
  let token = new Circle(40,canvas.height-30,25,'green');
  let aux_token = token;
  let tokens_number = 21;
  let board = new Board();

  //--------------------------Draw First Screen-------------------------------//
  token.draw(ctx);
  board.draw(ctx);
  drawTokensCounter(tokens_number, ctx);
  //--------------------------Drag tokens-------------------------------------//
  canvas.onmousedown = function(e){
    if(token.isClicked(getMousePos(e).x,getMousePos(e).y)){
      drag = true;
    }
  }

  canvas.onmouseup = function(e){
    if(drag){
      drag = false;
      if(tokens_number!=0){
        tokens_number--;
        ctx.clearRect(10,10,35,30);
        //Dibujo una nueva ficha
        token.draw(ctx);
        aux_token = token;
      }
      drawTokensCounter(tokens_number, ctx);
    }
  }

  canvas.onmousemove = function(e){
    if(drag){
      let mousePos = getMousePos(e);
      reDrawCanvas(mousePos,canvas,aux_token,ctx,board,tokens_number);
        //Clear the circle and draw another on mouse position
        // let clearToken = new Circle(aux_token.getParamX(), aux_token.getParamY(), aux_token.getRadio(), 'rgba(0,0,0,255)');
        // clearToken.drawWithBorder(ctx,1.8,canvas.style.backgroundColor);
         let actualToken = new Circle(mousePos.x, mousePos.y, aux_token.getRadio(), aux_token.getColor())
        // actualToken.draw(ctx);
         aux_token = actualToken;
    }
  }
}
