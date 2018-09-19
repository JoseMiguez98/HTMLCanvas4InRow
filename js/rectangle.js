function Rectangle(_x,_y,_w,_h, _c){
  this.paramX = _x;
  this.paramY = _y;
  this.width = _w;
  this.height = _h;
  this.color = _c;
}

Rectangle.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.fillRect(this.paramX,this.paramY,this.width,this.height);
  ctx.fill();
  ctx.closePath();
}

Rectangle.prototype.drawWithBorder = function(ctx, width, borderColor){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.rect(this.paramX,this.paramY,this.width,this.height);
  ctx.fill();
  ctx.closePath();
  ctx.lineWidth = width;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
}

Rectangle.prototype.getParamX = function(){
  return this.paramX;
}

Rectangle.prototype.getParamY = function(){
  return this.paramY;
}

Rectangle.prototype.getWidth = function(){
  return this.width;
}

Rectangle.prototype.getHeight = function(){
  return this.height;
}
