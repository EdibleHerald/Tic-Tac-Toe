

// We need a function to create the board

const board = {

    setBoard: function(){
        // Create elements
        for(let i=0;i<9;i++){
            let newboard = document.createElement("div");
            newboard.id = "div"+i;
            newboard.classList.add("tileDiv");
    
            let boardDiv = document.getElementById("fullBoardDiv");
            boardDiv.appendChild(newboard);
        }
    },
    resetBoard: function(){
        // Wipe attributes
        for(let i=0;i<9;i++){
            let selectedTile = document.getElementById("div"+i);

            try{
                selectedTile.classList.remove("selectedPlayer");
            }
            catch(error){
                console.log("Does not have selectedPlayer class");
            }
            

            try{
                selectedTile.classList.remove("selectedBot");
            }
            catch(error){
                console.log("Does not have selectedBot class");
            } 
            finally{
                continue;
            }
        }
    }
    
}

// Time related Functions
const timer = {
    
    start: function(sec){

        let timer = setInterval(function(){
            document.getElementById("updateTimer").innerHTML = ""+sec;
            sec--;
            if(sec<0){
                clearInterval(timer);
            }
        },1000)
    }
}

// Settings related functions

    // Theme switch
let theme = {
    darkmode: () => {
            try {
            localStorage.getItem('darkmode');
        } catch (error) {
            console.log(error);
            console.log("Did not find DARKMODE active");
        }
    },
    changeTheme: () => {
        if('darkmode' == 'active'){
            let body = document.querySelector("body");
            body.classList.add("darkmode");
        }else{
            document.querySelector("body").classList.remove("darkmode");
        }
    },
    toLight: () =>{
        localStorage.setItem('darkmode', "false");
        changeTheme;
    },
    toDark: () =>{
        localStorage.setItem('darkmode','active');
        changeTheme;
    }
}



// Onload configurations
document.querySelector("body").onload = board.setBoard();
document.querySelector("body").onload = timer.start(0);

    // Create 'darkmode' cookie if not already created
document.querySelector("body").onload = () => {
    if(localStorage.getItem("darkmode") === null){
        localStorage.setItem("darkmode", "false");
    }
}

