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
    var w = check();
    if(w != 0){
        noLoop();
        console.log(w);
    }
}
function move(i,j){
    if(currentPlayer == 0){
        grid[i][j].tag = 1;
        currentPlayer = 1;
        
    }else if(currentPlayer == 1){
        grid[i][j].tag = 2;
        currentPlayer = 0;
    }
}
function across(a,b,c){
    if(a.tag==b.tag && b.tag==c.tag && a.tag !=0){
        console.log("t");
        return true;
    }
    return false;
}
function check(){
    //0: no winners yet
    //1: player 1 wins
    //2: player 2 wins
    //3: tie
    var winner = 0;
    //check horizontal wins
    for(var i= 0;i<3;i++){
        if(across(grid[i][0],grid[i][1],grid[i][2])){
            winner = grid[i][0].tag;
        }
    }
    //check vertical wins
    for(i= 0;i<3;i++){
        if(across(grid[0][i],grid[1][i],grid[2][i])){
            winner = grid[0][i].tag;
        }
    }
    //check diagonal wins
        if(across(grid[0][0],grid[1][1],grid[2][2])){
            winner = grid[0][0].tag;
        }
        if(across(grid[0][2],grid[1][1],grid[2][0])){
            winner = grid[0][2].tag;
        }

    //check for tie
    var empty = 9;
    for(i = 0;i < 3; i++){
        for(j = 0;j < 3; j++){
            if(grid[i][j].tag != 0){
                empty--;
            }
        }
    }
    if(winner == 0 && empty==0){
        winner = 3;
    }
    return winner;
}
function mouseClicked(){
    var clickedX = Math.floor(mouseX/100);
    var clickedY = Math.floor(mouseY/100);

    if(clickedX >= 0 && clickedX < 3 && clickedY >= 0 && clickedY < 3){
        if(grid[clickedX][clickedY].tag == 0){
            move(clickedX,clickedY);
        }
        
    }
}