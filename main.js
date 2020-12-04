var grid = new Array(3);
var currentPlayer = 0;
function node(i,j){
    this.x = i;
    this.y = j;
    //0: empty
    //1: X
    //2: O
    this.tag =0;
    this.show = function(){
        if(this.tag == 1){
            fill(255,255,0);
        }else if(this.tag == 2){
            fill(0,255,255)
        }else{
            fill(255);
        }
        stroke(0);
        rect(this.x*100,this.y*100,99,99);
    }
}
function setup(){
    //create grid
    createCanvas(300,300)
    for(var i = 0; i < 3; i++){
        grid[i] = new Array(3);
    }
    //assigns each element of grid a node
    for(i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            grid[i][j] = new node(i,j);
        }
    }

}
function draw(){
    background(0);
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            grid[i][j].show();
        }
    }
}
function move2(i,j){
    if(currentPlayer == 0){
        grid[i][j].tag = 1;
        currentPlayer = 1;
        
    }else if(currentPlayer == 1){
        grid[i][j].tag = 2;
        currentPlayer = 0;
    }
}
function mouseClicked(){
    var clickedX = Math.floor(mouseX/100);
    var clickedY = Math.floor(mouseY/100);

    if(clickedX >= 0 && clickedX < 3 && clickedY >= 0 && clickedY < 3){
        if(grid[clickedX][clickedY].tag == 0){
            move2(clickedX,clickedY);
        }
        
    }
}