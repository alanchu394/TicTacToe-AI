var grid = new Array(3);
var gameStatus = 0;
var currentPlayer = 0;
var AIPosition=0;
function node(i,j){
    this.x = i;
    this.y = j;
    //0: empty
    //1: X
    //2: O
    this.tag =0;
    this.show = function(){
        fill(255);
        rect(this.x*100,this.y*100,99,99);
        if(this.tag == 1){
            drawCircle(this.x,this.y);
            
        }else if(this.tag == 2){
            drawX(this.x,this.y);
        }else{

            
            fill(255);

            
        }
        stroke(0);
        
    }
}
function drawCircle(i,j){
    ellipse((i*100)+50,(j*100)+50,75);
}
function drawX(i,j){
    fill(0);
    textSize(75);
    text("X",(i*100)+25,(j*100)+75);
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

    if(gameStatus == 1){
        var w = check();
        
        if(w != 0){
            textSize(30);
            fill(255,0,0);
            if(w == 1 || w == 2){
                text("Computer  won!",50,150);

                
            }
            
            if(w == 3){
                text("Tied!",120,150);
            }
            gameStatus = 2;
            noLoop();

        }
        if(currentPlayer == 0 && gameStatus == 1){
            AITurn();
        }
        
        
    }

}
function HFirst(){
    if (gameStatus == 0){
        currentPlayer =1;
        AIPosition = 1;
        gameStatus =1;
    }
}
function AIFirst(){
    if (gameStatus == 0){
        currentPlayer =0;
        gameStatus =1;
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
        for(var j = 0;j < 3; j++){
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
    if(gameStatus == 1){
        var clickedX = Math.floor(mouseX/100);
        var clickedY = Math.floor(mouseY/100);

    if(clickedX >= 0 && clickedX < 3 && clickedY >= 0 && clickedY < 3){
        if(grid[clickedX][clickedY].tag == 0){
            move(clickedX,clickedY);
        }
        
    }
    }
}
function AITurn(){
    var bestMove = new Array(2);
    var bestScore = -Infinity;
    var score;
    for(var i = 0; i <3; i++){
        for(var j = 0; j <3; j++){
            if(grid[i][j].tag == 0){
                grid[i][j].tag= 1;
                score = miniMax(grid, 0, false);
                grid[i][j].tag= 0;
                if(score > bestScore){
                    bestScore = score;
                    bestMove[0] = i;
                    bestMove[1] = j;
                }

            }
        }
    }
    move(bestMove[0],bestMove[1]);
}
function miniMax(board, depth, isMaxing){
    var result = check();

    if(result == 1){
        return 10;
    }
    if(result == 2){
        return -10;
    }
    if(result == 3){
        return 0;
    }
    if(isMaxing){
        var bestScore = -Infinity;
        for(var i = 0; i <3; i++){
            for(var j = 0; j <3; j++){
                if(board[i][j].tag == 0){
                    board[i][j].tag = 1;
                    var score = miniMax(board,depth+1,false)-depth;
                    board[i][j].tag = 0;
                    bestScore = max(score,bestScore);
                }
            }
        }
        return bestScore;
    }else{
        bestScore = Infinity;
        for( i = 0; i <3; i++){
            for( j = 0; j <3; j++){
                if(board[i][j].tag == 0){
                    board[i][j].tag = 2;
                    score = miniMax(board,depth+1,true)+depth;
                    board[i][j].tag = 0;
                    bestScore = min(score,bestScore);
                }
            }
        }
        return bestScore;
    }

}