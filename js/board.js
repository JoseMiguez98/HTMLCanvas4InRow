function Board(){
  this.structure = this.generateGameBoard();
  this.dropZone = this.generateDropZone();
}

Board.prototype.generateGameBoard = function(){
  let rect = new Rectangle(canvas.width/3.3,canvas.height/5,485,400,"rgb(0,0,240)");
  let fields = [];
  let x_dif = 65;
  let y_dif = 60;
  let x0 = 47;
  let y0 = 50;
  let xtemp = x0;
  let ytemp = y0;

  for (let i=0;i<6;i++){
    let row = [];
    for (let j=0;j<7;j++){
      let field = new Field(rect.getParamX()+xtemp,rect.getParamY()+ytemp,25,"white");
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

Board.prototype.generateDropZone = function(){
  let dx = this.structure.rectangle.getParamX();
  let dy = this.structure.rectangle.getParamY()-80;
  let width = this.structure.rectangle.getWidth();
  let height = this.structure.rectangle.getParamY()-dy;
  let color = "rgba(255,0,0,0.5)";
  return new Rectangle(dx,dy,width,height,color);
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
  this.dropZone.draw(ctx);
}

Board.prototype.getParamX = function(){
  return this.structure.rectangle.getParamX();
}

Board.prototype.getParamY = function(){
  return this.structure.rectangle.getParamY();
}

Board.prototype.getWidth = function(){
  // console.log(this.structure);
  return this.structure.rectangle.getWidth();
}

Board.prototype.getHeight = function(){
  return this.structure.rectangle.getHeight();
}
