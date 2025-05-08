

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
        this.resetBoardColors();
        this.resetBoardListeners();
    },
    resetBoardColors:function(){
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
        }
    },
    resetBoardListeners:function(){
        for(let i=0;i<9;i++){
            let selectedTile = document.getElementById("div"+i);
            
            selectedTile.removeEventListener("click",game.playerTile);
        }
    }
    
}

// Time related Functions
const timer = {
    // For Timer under title
    start: function(){
        let sec = Number(document.getElementById("timerSetting").value);
        let timer = setInterval(function(){
            document.getElementById("updateTimer").innerHTML = ""+sec;
            sec--;
            if(sec<0){
                clearInterval(timer);
            }
        },1000);
    },
    wait: function(ms){
        return new Promise(resolve => setTimeout(resolve,ms));
    },
    timeout:async function main(ms){
        await this.wait(ms);
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
    playerScore:[],
    botScore:[],
    blackList:[],
    turnCount:0,
    won:0,
    start(){
       // Initiate either player or bot turn depending on selected settings
       // Should only be run ONCE, use while(True) to prevent calling Start again
       console.log("started");
       game.playerScore = [];
       game.botScore = [];
       game.blackList = [];
       game.won = 0;
       game.turnCount = 0;
        
       // Decide on first choice
       let firstChoice = local_Storage.get_firstTurn();
       console.log(firstChoice);
       if(firstChoice == "player"){
        console.log("player goes first");
        for(let i=0;i<9;i++){
            let tile = document.getElementById("div"+i);
            console.log(tile);
            tile.addEventListener("click", game.playerTile);
        }
       }else if(firstChoice == "bot"){
            game.botTurn();
       }else{
        console.log("ERROR: firstChoice is INCORRECTLY SET");
       }

       // Change START button to STOP
       let button = document.getElementById("startButton");
       button.textContent = "STOP";
       button.removeEventListener("click",game.start);
       button.addEventListener("click",game.endGame);
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
    playerTurn(id){
        let array = id.split("");
        // I need the number at the end for the array
        // Ex. Div4 --> [D(0), I(1), V(2), 4(3)] (numbers are index in an array)

        let tileNumber = Number(array[3]);
        let allower = game.checkBlackList(tileNumber);
        
        if(allower == false){
            this.playerScore.push(tileNumber);
            this.blackList.push(tileNumber);
            this.updateColor();
            this.turnCount +=1;
            this.winCheck();
            if(this.won != 1){
                game.botTurn();
            }
        }
    },
    botTurn(){
        // I will probably add "difficulties later but for now, randomly generated numbers will do"
        
        while(true){
            let number = Math.floor(9*Math.random());
            let allow_number = game.checkBlackList(number);

            if(allow_number == true){
                continue;
            }else{

                game.botScore.push(number);
                game.blackList.push(number);
                game.updateColor();
                game.turnCount +=1;
                game.winCheck();
                break;
            }
            
            
        }
    },
    checkBlackList(number){
        // Check inputs from either bot or player to ensure that no number is chosen more than once
        // Simply iterate input through the blackList array
        
        // If player picks chosen tile, simply ignore input
            // Return a boolean value for playerTurn() to determine next action
        // If bot picks chosen tile, recall botTurn() to get a new input
        let array = game.blackList;
        let length = array.length;
        for(let i = 0;i<length;i++){
            if(array[i] == number){
                return true; 
            }
        }
        return false;
    },
    updateColor(){
        // I want an automatic way for tiles to be color-coded.
        // Instead of having playerTurn and botTurn handle it,
        // I will instead have this function check both botScore and playerScore and update their respective tiles

        // check player tiles
        this.playerScore.forEach((number)=>{
            let id = "div" + number;
            let tile = document.getElementById(id);

            if( !(tile.classList.contains("selectedPlayer")) ){
                tile.classList.add("selectedPlayer");
            }
        })

        // check bot tiles
        this.botScore.forEach((number)=>{
            let id = "div" + number;
            let tile = document.getElementById(id);

            if( !(tile.classList.contains("selectedBot")) ){
                tile.classList.add("selectedBot");
            }
        })

    },
    winCheck(){
        // I want to check for wins after each turn. 
        // I want to do this by checking each row,column and diagnol
        // I also need to check for both player and bot seperately
        // [0 1 2
        //  3 4 5
        //  6 7 8]

        // Rows
        for(let i = 0;i<7;i){
            let array = [i,i+1,i+2];
            

            if(array.every((element)=>{
                return game.playerScore.includes(element);
            })){
                game.endGame("player");
            }else if(array.every((element)=>{
                return game.botScore.includes(element);
            })){
                game.endGame("bot");
            }
            i+=3;
        }

        //Columns
        for(let i = 0;i<3;i++){
            let array = [i,i+3,i+6];
            if(array.every((element)=>{
               return game.playerScore.includes(element);
            })){
                game.endGame("player");
            }else if(array.every((element)=>{
               return game.botScore.includes(element);
            })){
                game.endGame("bot");
            }
        }
        
        // Just gonna write in the diagonals myself since they're annoying to deal with
        let diagonal1 = [0,4,8];
        let diagonal2 = [2,4,6];

        if(diagonal1.every( (element)=> {
           return game.playerScore.includes(element);
        })){
            game.endGame("player");
        } else if(diagonal1.every( (element)=> {
            return game.botScore.includes(element);
        })){
            game.endGame("bot");
        }

        if(diagonal2.every( (element)=> {
           return game.playerScore.includes(element);
        })){
            game.endGame("player");
        } else if(diagonal2.every( (element)=> {
            return game.botScore.includes(element);
        })){
            game.endGame("bot");
        }

        // Check for tie
        if(game.turnCount >= 9 && game.won != 1){
            game.endGame("tie");
        }

        // Might make comparsions into a seperate function later on as this is a little hard to read
    },
    async endGame(name){
        // End game, preferably by stating winner then wiping the board
        if(name == "player"){
            console.log("Player wins!");
        }else if(name == "bot"){
            console.log("Bot Wins!")
        }else if(name == "tie"){
            console.log("Tied!")
        }else{
            console.log("nobody won??")
        }
        let button = document.getElementById("startButton");
        // I want the final board to stay visible for 3 seconds after winning!
        // First we remove any event listeners!
        board.resetBoardListeners();
        game.botScore = [];
        game.playerScore = [];
        game.blackList = [];
        game.won=1;
        button.textContent = "Waiting...";
        button.removeEventListener("click",game.endGame);
        await timer.timeout(3000);

        button.textContent = "START";
        button.addEventListener("click",game.start);
        board.resetBoardColors();
        

    },
    playerTile(event){
        let id = event.target.id;
        game.playerTurn(id);
        
    }
}

// Onload configurations

document.querySelector("body").onload = board.setBoard();
document.querySelector("body").onload = timer.start(0);

    // Create 'darkmode' cookie if not already created
    // Check cookie and change theme if needed

document.querySelector("body").onload = settings.theme.check_darkmode();
document.querySelector("body").onload = settings.first_Go.init();
document.getElementById("startButton").addEventListener("click",game.start);

