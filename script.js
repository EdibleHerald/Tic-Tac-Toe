

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
            }
        },1000);
    }
    //stop: Stop functions here
}

// Settings related functions

const settings = {
    // Theme switch
    theme : {
        check_darkmode(){
            if(local_Storage.get_theme === null){
                localStorage.setItem("darkmode", "false");
            }else{
                this.changeTheme();
            }
            
        },
        changeTheme(){
            let button = document.getElementById("theme-switch");
            let body = document.querySelector("html");
    
            if(localStorage.getItem("darkmode") == 'active' ){
                body.classList.remove("darkmode");
                body.classList.add("darkmode");
    
                button.textContent = "Light Mode";
    
                button.onclick = () => {this.toLight()};

                console.log("Darkmode activated")
                
            }else{
                body.classList.remove("darkmode");
                console.log("Darkmode Disabled");
    
                button.textContent = "Dark Mode";
    
                button.onclick = () => {this.toDark()};
            }
        },
        toLight(){
            localStorage.setItem('darkmode', 'false');
            this.changeTheme();
    
            document.getElementById("theme-switch").onclick = () => {
                this.toDark();
            }
        },
        toDark(){
            localStorage.setItem('darkmode','active');
            this.changeTheme();
    
            document.getElementById("theme-switch").onclick = () => {
                this.toLight();
            }
        }
    },
    first_Go : {
        init(){
            if(local_Storage.get_firstTurn() === null){
                this.setTurn("player")
            }else{
                this.toggle();
            }

        },
        setTurn(name){
            if(name == "player"){
                local_Storage.set_firstTurn("player");
                console.log("Player goes first!");
                this.toggle();
            }else{
                local_Storage.set_firstTurn("bot");
                console.log("Bot goes first!");
                this.toggle();
            }
        },
        toggle(){
            let state = local_Storage.get_firstTurn();
            let button = document.getElementById("turn-switch");
            if(state == "player"){
                button.textContent = "Bot first";
                button.onclick = () => {this.setTurn("bot")};
            }else{
                button.textContent = "Player First";
                button.onclick = () => {this.setTurn("player")};
            }
        }
    }

}

// localStorage related functions
const local_Storage ={
    get_theme(){
        return localStorage.getItem("darkmode");
    },
    set_theme(state){
        localStorage.setItem("darkmode",state);
    },
    get_firstTurn(){
        return localStorage.getItem("firstTurn");
    },
    set_firstTurn(state){
        localStorage.setItem("firstTurn", state);
    }
} 

    // Let player choose who should start first (save settings too)


// Actual Game Functions !!!!
// We want tic-tac-toe using two arrays for the player and bot respectively
// Board tiles - {0,1,2,3,4,5,6,7,8}
const game = {
    start:() => {
       // Initiate either player or bot turn depending on selected settings
       // Should only be run ONCE, use while(True) to prevent calling Start again

       let playerArray = {};
       let botArray = {};
       let blacklistArray = {};
        
       // Decide on first choice
       let firstChoice = local_Storage.get_firstTurn();
       while(True){
        
       }
    },
    tileSelect(chooser){
        if(chooser=="player"){
            // Add tile to player array
            // Add selectedPlayer CSS class to tile 
            // blacklist tile from being chosen
            // Game should continue on its own
        }else if(chooser=="bot"){
            // Add tile to bot array
            // Add selectedBot CSS class to tile 
            // blacklist tile from being chosen
            // Game should continue on its own
        }
    },
    playerTurn(){
        
    },
    botTurn(){

    }
}


// Onload configurations

document.querySelector("body").onload = board.setBoard();
document.querySelector("body").onload = timer.start(0);

    // Create 'darkmode' cookie if not already created
    // Check cookie and change theme if needed

document.querySelector("body").onload = settings.theme.check_darkmode();
document.querySelector("body").onload = settings.first_Go.init();



