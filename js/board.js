function Board(){
  this.structure = this.generateGameBoard();
}

Board.prototype.generateGameBoard = function(){
  let rect = new Rectangle(canvas.width/3.5,canvas.height/10,560,460,"rgb(0,0,240)");
  let fields = [];
  let x_dif = 75;
  let y_dif = 70;
  let x0 = 55;
  let y0 = 55;
  let xtemp = x0;
  let ytemp = y0;

  for (let i=0;i<6;i++){
    let row = [];
    for (let j=0;j<7;j++){
      let field = new Field(rect.getParamX()+xtemp,rect.getParamY()+ytemp,30,"white");
      row.push(field);
      xtemp+=x_dif;
    }
    fields.push(row);
    ytemp+=y_dif;
    xtemp = x0;
  }

  return{
    "rectangle" : rect,
    "fields" : fields
  };
}

Board.prototype.draw=function(ctx){
  let rect = this.structure.rectangle;
  let fields = this.structure.fields;
  rect.draw(ctx);

  for(let i=0;i<fields.length;i++){
    for(let j=0;j<fields[0].length;j++){
      fields[i][j].draw(ctx);
    }
  }
}
