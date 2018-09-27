function Circle(_x,_y,_r,_c){
  this.paramX = _x;
  this.paramY = _y;
  this.radio = _r;
  this.color = _c;
}

Circle.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.paramX,this.paramY,this.radio,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

Circle.prototype.drawWithBorder = function(ctx, width, borderColor){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.paramX,this.paramY,this.radio,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();
  ctx.lineWidth = width;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
}

Circle.prototype.isClicked = function(mouseX, mouseY){
  let distanceX = mouseX - this.paramX;
  let distanceY = mouseY - this.paramY;
  let distance = Math.sqrt(Math.pow(distanceX, 2)+Math.pow(distanceY, 2));

  return distance<=this.radio;
}

// Circle.prototype.drawOn = function(ctx, mouseX, mouseY){
//   ctx.fillStyle = this.color;
//   ctx.beginPath();
//   ctx.arc(mouseX,mouseY,this.radio,0,Math.PI*2);
//   ctx.fill();
//   ctx.closePath();
// }

Circle.prototype.setNotClickable = function(){
  this.isClicked = function(){
    return false;
  }
}

Circle.prototype.getRadio = function(){
  return this.radio;
}

Circle.prototype.getColor = function(){
  return this.color;
}

Circle.prototype.getParamX = function(){
  return this.paramX;
}

Circle.prototype.getParamY = function(){
  return this.paramY;
}

Circle.prototype.getXY = function(){
  return {
    "x": this.getParamX(),
    "y": this.getParamY()
  };
}

Circle.prototype.setXY = function(_x,_y){
  this.paramX = _x;
  this.paramY = _y;
}
