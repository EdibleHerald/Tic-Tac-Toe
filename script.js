

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
    
    start: function(){
        let sec = Number(document.getElementById("timerSetting").value);
        let timer = setInterval(function(){
            document.getElementById("updateTimer").innerHTML = ""+sec;
            sec--;
            if(sec<0){
                clearInterval(timer);
                stop;
            }
        },1000);
    }
    //stop: Stop functions here
}

// Settings related functions

    // Theme switch
let theme = {
    check_darkmode: () => {
        if(localStorage.getItem("darkmode") === null){
            localStorage.setItem("darkmode", "false");
        }else{
            theme.changeTheme();
        }
        
    },
    changeTheme: () => {
        let button = document.getElementById("theme-switch");
        let body = document.querySelector("html");

        if(localStorage.getItem("darkmode") == 'active' ){
            body.classList.remove("darkmode");
            body.classList.add("darkmode");

            button.textContent = "Light Mode";

            button.onclick = () => {theme.toLight()};
            
        }else{
            body.classList.remove("darkmode");
            console.log("Darkmode Disabled");

            button.textContent = "Dark Mode";

            button.onclick = () => {theme.toDark()};
        }
    },
    toLight: () =>{
        localStorage.setItem('darkmode', 'false');
        theme.changeTheme();

        document.getElementById("theme-switch").onclick = () => {
            theme.toDark();
        }
    },
    toDark: () =>{
        localStorage.setItem('darkmode','active');
        theme.changeTheme();

        document.getElementById("theme-switch").onclick = () => {
            theme.toLight();
        }
    }
}



// Onload configurations

document.querySelector("body").onload = board.setBoard();
document.querySelector("body").onload = timer.start(0);

    // Create 'darkmode' cookie if not already created
    // Check cookie and change theme if needed

document.querySelector("head").onload = theme.check_darkmode();



