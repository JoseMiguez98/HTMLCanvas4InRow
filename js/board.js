function Board(ctx){
  this.structure = this.generateGameBoard(ctx);
  this.columns = this.generateColumnsArray();
  this.dropZone = this.generateDropZone();
}

Board.prototype.generateGameBoard = function(ctx){
  let gradient_style = ctx.createLinearGradient(canvas.width/3.3,canvas.height/5,canvas.width/3.3,canvas.height/5+400);
  gradient_style.addColorStop(0,"black");
  gradient_style.addColorStop(1,"blue");
  let rect = new Rectangle(canvas.width/3.3,canvas.height/5,485,400,gradient_style);
  let fields = [];
  let x_dif = 65;
  let y_dif = 60;
  let x0 = 47;
  let y0 = 51;
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

Board.prototype.generateColumnsArray = function(){
  let columns = [];
  for (let i = 0; i < 7; i++) {
    columns[i] = (this.structure.rectangle.getWidth()/7)*i;
  }
  return columns
}

Board.prototype.generateDropZone = function(){
  let dx = this.structure.rectangle.getParamX();
  let dy = this.structure.rectangle.getParamY()-80;
  let width = this.structure.rectangle.getWidth();
  let height = this.structure.rectangle.getParamY()-dy;
  let color = "rgba(0,0,0,0)";
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

Board.prototype.isInDropzone=function(mousePos){
  let x0 = this.dropZone.getParamX();
  let x1 = x0+this.dropZone.getWidth();
  let y0 = this.dropZone.getParamY();
  let y1 = y0+this.dropZone.getHeight();

  return (mousePos.x>x0&&mousePos.x<x1)&&(mousePos.y>y0&&mousePos.y<y1);
}

Board.prototype.getSize = function(){
  let sum = 0;
  for(let i = 0; i<this.structure.fields.length ; i++){
    sum += this.structure.fields[i].length;
  }
  return sum;
}

Board.prototype.getColumn = function(mousePos){
  mousePos.x = mousePos.x - this.structure.rectangle.getParamX();
  for (let i = 0; i < this.columns.length-1; i++) {
    if(mousePos.x>this.columns[i] && mousePos.x<this.columns[i+1]){
      return i;
    }
  }
  return this.columns.length-1;
}

Board.prototype.getAvailableField = function(column){
  for (let i = this.structure.fields.length-1; i >= 0; i--) {
    console.log(i);
    if(this.structure.fields[i][column].getState() == 0){
      return this.structure.fields[i][column];
    }
  }
  return -1;
}

Board.prototype.isWinner = function(){
  //Check rows
  for(let i = 0 ; i<this.structure.fields.length ; i++){
    for(let j = 0; j<4 ; j++){
      if(this.structure.fields[i][j].getState()!=0){
        let f1 = this.structure.fields[i][j].getState();
        let f2 = this.structure.fields[i][j+1].getState();
        let f3 = this.structure.fields[i][j+2].getState();
        let f4 = this.structure.fields[i][j+3].getState();
        if(f1===f2&&f2===f3&&f3===f4){
          return true;
        }
      }
    }
  }
  //Check columns
  for(let i = 0 ; i<7 ; i++){
    for(let j = 0; j<3 ; j++){
      if(this.structure.fields[j][i].getState()!=0){
        let f1 = this.structure.fields[j][i].getState();
        let f2 = this.structure.fields[j+1][i].getState();
        let f3 = this.structure.fields[j+2][i].getState();
        let f4 = this.structure.fields[j+3][i].getState();
        if(f1==f2&&f2==f3&&f3==f4){
          return true;
        }
      }
    }
  }

  return false;
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
