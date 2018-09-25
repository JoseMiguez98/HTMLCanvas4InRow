function Player(_playerNumber, _alias, _tokenColor){
  this.playerNumber = _playerNumber;
  this.alias = _alias;
  this.tokenBox = this.generateTokens();
  this.tokenColor = _tokenColor;
  this.boxColor;
}

Player.prototype.generateTokens = function(){
  let fields = [];
  let rect_x_offset = 100;
  let x_rect = (this.playerNumber==1)?rect_x_offset:(canvas.width/2)+(rect_x_offset*2.6);
  let y_rect = 70;
  let rect = new Rectangle(x_rect,y_rect,235,455,this.boxColor);
  let x_dif = 70;
  let y_dif = 60;
  let x0 = 47;
  let y0 = 50;
  let xtemp = x0;
  let ytemp = y0;

  for (let i=0;i<7;i++){
    let row = [];
    for (let j=0;j<3;j++){
      let field = new Field(rect.getParamX()+xtemp,rect.getParamY()+ytemp,25,this.tokenColor);
      row.push(field);
      xtemp+=x_dif;
    }
    fields.push(row);
    ytemp+=y_dif;
    xtemp = x0;
  }

  return{
    "rectangle" :rect,
    "fields" : fields
  };
}

Player.prototype.drawName =  function(ctx){
  ctx.font = "50px Georgia";
  ctx.fillStyle = "blue";
  ctx.fillText(this.alias,this.tokenBox.rectangle.getParamX()+35,this.tokenBox.rectangle.getParamY()-10);
}

Player.prototype.drawTokenBox = function(ctx){
  let rect = this.tokenBox.rectangle;
  let fields = this.tokenBox.fields;
  rect.draw(ctx);
  this.drawName(ctx);

  for(let i=0;i<fields.length;i++){
    for(let j=0;j<fields[0].length;j++){
      fields[i][j].draw(ctx);
    }
  }
}

Player.prototype.setColor = function(color){
  this.boxColor = color;
  this.tokenBox=this.generateTokens();
}

Player.prototype.getTokens = function(){
  let tokens = [];
  for(let i=0;i<7;i++){
    for(let j=0;j<3;j++){
      tokens.push(this.tokenBox.fields[i][j]);
    }
  }
  return tokens;
}
