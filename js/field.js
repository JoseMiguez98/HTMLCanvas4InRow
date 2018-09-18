class Field extends Circle{
  constructor(_x,_y,_r,_c){
    super(_x,_y,_r,_c);
    this.state = 0;
  }

  getState(){
    return this.state;
  }

  setState(_state){
    this.state = _state;
  }
}
