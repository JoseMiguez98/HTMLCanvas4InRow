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

function reDrawCanvas(canvas,ctx,board,players){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  board.draw(ctx);
  players[0].drawTokenBox(ctx);
  players[1].drawTokenBox(ctx);
}

window.onload = function(){
  //--------------------------Inicialize variables----------------------------//

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let drag = false;
  let turn = 1;
  let board = new Board(ctx);
  let jugador1 = new Player(1,"Player 1", "red");
  let jugador2 = new Player(2,"Player 2", "yellow ");
  let clicked_token;
  let clicked_token_init_pos;

  //-------------------------Configure player properties----------------------//
  let player1_gradient = ctx.createLinearGradient(jugador1.tokenBox.rectangle.getParamX(), jugador1.tokenBox.rectangle.getParamY(), jugador1.tokenBox.rectangle.getParamX(), jugador1.tokenBox.rectangle.getParamY()+455);
  let player2_gradient = ctx.createLinearGradient(jugador2.tokenBox.rectangle.getParamX(), jugador2.tokenBox.rectangle.getParamY(), jugador2.tokenBox.rectangle.getParamX(), jugador2.tokenBox.rectangle.getParamY()+455);
  player1_gradient.addColorStop(0,'black');
  player1_gradient.addColorStop(1,'rgba(255,0,0,0)');
  player2_gradient.addColorStop(0,'black');
  player2_gradient.addColorStop(1,'rgba(0,255,0,0)');
  jugador1.setColor(player1_gradient);
  jugador2.setColor(player2_gradient);
  //--------------------------Draw First Screen-------------------------------//
  board.draw(ctx);
  jugador1.drawTokenBox(ctx);
  jugador2.drawTokenBox(ctx);
  //--------------------------Drag tokens-------------------------------------//

  canvas.onmousedown = function(e){
    let mousePos = getMousePos(e);
    for(let i=0;i<7;i++){
      for (let j=0;j<3;j++) {
        if(turn==1){
          if(jugador1.tokenBox.fields[i][j].isClicked(mousePos.x,mousePos.y)){
            drag = true;
            clicked_token = jugador1.tokenBox.fields[i][j];
            clicked_token_init_pos = jugador1.tokenBox.fields[i][j].getXY();
          }
        }
        else{
          if(jugador2.tokenBox.fields[i][j].isClicked(mousePos.x,mousePos.y)){
            drag = true;
            clicked_token = jugador2.tokenBox.fields[i][j];
            clicked_token_init_pos = jugador2.tokenBox.fields[i][j].getXY();
          }
        }
      }
    }
  }
//---------------------------Drop Token---------------------------------------//
  canvas.onmouseup = function(e){
    if(drag){
      let mousePos = getMousePos(e);
      drag = false;
      if(board.isInDropzone(mousePos)){
        let drop_column = board.getColumn(mousePos);
        let field = board.getAvailableField(drop_column);
        if(field != -1){
          field.setState(turn);
          clicked_token.setXY(field.getParamX(),field.getParamY());
          clicked_token.setNotClickable();
          if(board.isWinner()){
            let winner = turn;
            //Modal
            $( function() {
              $("#winnerMessage").html("<p>Player "+winner+" ha ganado la partida!");
              $("#winnerMessage").dialog({
                modal: true,
                buttons: {
                  "Nuevo Juego": function() {
                    location.reload();
                  }
                }
              });
              for(let i=0;i<7;i++){
                for (let j=0;j<3;j++) {
                  jugador1.tokenBox.fields[i][j].setNotClickable();
                  jugador2.tokenBox.fields[i][j].setNotClickable();
                }
              }
            });
            //
          }
          turn=(turn==1)?2:1;
        }
        else{
          clicked_token.setXY(clicked_token_init_pos.x,clicked_token_init_pos.y);
        }
      }
      else{
        clicked_token.setXY(clicked_token_init_pos.x,clicked_token_init_pos.y);
      }
      reDrawCanvas(canvas,ctx,board,[jugador1, jugador2]);
    }
  }

  canvas.onmousemove = function(e){
    if(drag){
      let mousePos = getMousePos(e);
      clicked_token.setXY(mousePos.x,mousePos.y);
      reDrawCanvas(canvas,ctx,board,[jugador1, jugador2]);
    }
  }
}
