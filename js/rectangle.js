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
