// Create board

function newBoard(){
    
    
    for(let i=0;i<9;i++){
        let newboard = document.createElement("div");
        newboard.id = "div"+i;
        newboard.classList.add("boardDiv");

        let boardDiv = document.getElementById("fullBoardDiv");
        boardDiv.appendChild(newboard);
    }
}

newBoard();

