// Scripts for the odin-notes file
// currently just has RPS text and ui versions...
// note that these could be significantly cleaned up using classes as a future project

class SketchCell {
    //class containing a single cell in a SketchGrid
    constructor(row, col, color, rowContainer) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.rowContainer = rowContainer;
        this.cell = this.createDiv();
        this.cell.addEventListener("mouseenter", this.changeColor.bind(this));
    }

    createDiv() {
        const cell = document.createElement("div");
        cell.classList.add("sketch-cell");
        this.rowContainer.appendChild(cell);
        return cell;
    }

    changeColor() {
        console.log(this.cell);
        this.cell.style.background = this.color;
        console.log("bye");

    }
}

class SketchGrid {
    constructor(container, size, color, isErase) {
        this.container = container;
        this.size = size;
        this.color = color;
        this.isErase = isErase;
        this.grid = this.drawGrid();
    }

    resetContainer() {
        this.container.replaceChildren();
    }

    setSize(newSize) {
        this.size = newSize;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    setErase(isErasing) {
        this.isErase = isErasing;
    }

    drawGrid() {
        //draw and return an n x n grid where n is this.size
        this.resetContainer;
        let grid = [];
        for (let r = 0; r < this.size; r++) {
            grid.push([]);
            let sketchRow = document.createElement("div");
            sketchRow.classList.add("sketch-row");
            for (let c = 0; c < this.size; c++) {
                let cell = new SketchCell(r, c, this.color, sketchRow);
                grid[r].push(cell);
            }
            this.container.appendChild(sketchRow);
        }
        return grid;
    }

    redrawGrid(newSize) {
        this.setSize(newSize);
        this.grid = drawGrid();
    }

    
}



if (document.body.classList.contains("javascript-notes-body")) {
    const rochambeauButtonText = document.querySelector("#rochambeau-v1");
    const rochambeauButtonUI = document.querySelector("#rochambeau-v2");
    rochambeauButtonText.addEventListener("click", playRPSGameText);
    rochambeauButtonUI.addEventListener("click", playRPSGameUI)
}
else if (document.body.classList.contains("sketch-body")) {
    const container = document.querySelector("#sketch-container");
    const sketchGrid = new SketchGrid(container, 16, "#05060A", false);
}

function resetUI() {
    const uiRPSContainer = document.querySelector("#rps-ui-container");
    const uiScoreboard = document.querySelector("#rps-ui-scoreboard");
    const uiPlayerSide = document.querySelector("#rps-ui-playerside");
    const uiMiddleSide = document.querySelector("#rps-ui-middleside");
    const uiComputerSide = document.querySelector("#rps-ui-computerside");
    const uiExit = document.querySelector("#rps-ui-exit");
    uiPlayerSide.replaceChildren();
    uiMiddleSide.replaceChildren();
    uiComputerSide.replaceChildren();
    uiScoreboard.textContent = "";
    uiRPSContainer.classList.remove("flaming-text");
    uiExit.textContent = "";
}


function playRPSGameText() {
    resetUI();
    let playerScore = 0;
    let computerScore = 0;
    alert("Let's player rock paper scissors! First to three wins.");
    while (playerScore < 3 & computerScore < 3) {
        let result = playRPSRoundText();
        let message = "";
        switch (result) {
            case ("tie"):
                message = "This round's a tie!";
                break;
            case ("computer win"):
                message = "Computer wins this round!";
                computerScore += 1;
                break;
            default:
                message = "Player wins this round!";
                playerScore +=1;
                break;
        }
        alert(`${message} Current score: \nYou: ${playerScore}, Computer: ${computerScore}`);
    }
    if (playerScore == 3) {
        alert(`Congrats! You win! Final score: \nYou: ${playerScore}, Computer: ${computerScore}`);
    }
    else {
        alert(`Oh no! You lost! Final score: \nYou: ${playerScore}, Computer: ${computerScore} \nAI IS TAKING OVER THE WOOOOORLD!!!`);
    }
}

function playRPSRoundText() {
    const choices = ["rock", "paper", "scissors"];
    const computerInput = choices[Math.floor(Math.random() * 3)];
    console.log(computerInput);
    let playerInput = String(prompt("Choose rock, paper, or scissors:").toLowerCase().trim());
    while (!choices.includes(playerInput)) {
        playerInput = String(prompt("Invalid choice, please choose rock, paper, or scissors:").toLowerCase().trim());
    }
    switch (true) {
        case (computerInput == playerInput): 
            return "tie";
        case (choices.indexOf(computerInput) % 3 == (choices.indexOf(playerInput) + 1 % 3)):
            return "computer win";
        default:
            return "player win";
        
    }
}

function playRPSGameUI() {
    //reset any previous UI
    resetUI();

    //set score variables
    let playerScore = 0;
    let computerScore = 0;

    //find existing divs to manipulate
    const uiRPSContainer = document.querySelector("#rps-ui-container");
    const uiScoreboard = document.querySelector("#rps-ui-scoreboard");
    const uiPlayerSide = document.querySelector("#rps-ui-playerside");
    const uiMiddleSide = document.querySelector("#rps-ui-middleside");
    const uiComputerSide = document.querySelector("#rps-ui-computerside");

    //create images
    const playerRockIcon = document.createElement("img");
    const playerPaperIcon = document.createElement("img");
    const playerScissorsIcon = document.createElement("img");
    const comRockIcon = document.createElement("img");
    const comPaperIcon = document.createElement("img");
    const comScissorsIcon = document.createElement("img");

    //initialize arrays to make it easier to manipulate
    const playerRPSIcons = [playerRockIcon, playerPaperIcon, playerScissorsIcon];
    const comRPSIcons = [comRockIcon, comPaperIcon, comScissorsIcon];
    const rpsImages = ["./images/rock.jpg", "./images/paper.png", "./images/scissors.jpg"];
    const rpsIDs = ["player-rock", "player-paper", "player-scissors", "com-rock", "com-paper", "com-scissors"];

    //stylize
    uiScoreboard.textContent = "Welcome to ROCK PAPER SCISSORS!";
    uiRPSContainer.classList.add("flaming-text");
    const playerLabel = document.createElement("span");
    const comLabel = document.createElement("span");
    const scoreOfPlayer = document.createElement("span");
    const scoreOfCom = document.createElement("span");
    playerLabel.textContent = "Player";
    comLabel.textContent = "Computer";
    scoreOfPlayer.textContent = playerScore;
    scoreOfCom.textContent = computerScore;
    scoreOfPlayer.setAttribute("id", "score-of-player");
    scoreOfCom.setAttribute("id", "score-of-com");
    uiPlayerSide.appendChild(playerLabel);
    uiComputerSide.append(comLabel);
    uiPlayerSide.appendChild(scoreOfPlayer);
    uiComputerSide.append(scoreOfCom);
    for (let i = 0; i < playerRPSIcons.length; i++) {
        let playerIcon = playerRPSIcons[i];
        let comIcon = comRPSIcons[i]
        let source = rpsImages[i];
        playerIcon.classList.add("button-image");
        comIcon.classList.add("button-image");
        playerIcon.classList.add("unselected-button");
        comIcon.classList.add("unselected-button");
        playerIcon.setAttribute("id", rpsIDs[i]);
        comIcon.setAttribute("id", rpsIDs[i + 3]);
        playerIcon.src = source;
        comIcon.src = source;
        playerIcon.height = 100;
        playerIcon.width = 100;
        comIcon.height = 100;
        comIcon.width = 100;
        playerIcon.addEventListener("click", () => playRPSRoundUI(i));
        uiPlayerSide.appendChild(playerIcon);
        uiComputerSide.appendChild(comIcon);
    }
    uiMiddleSide.textContent = "VS.";
    uiExit = document.querySelector("#rps-ui-exit");
    uiExit.textContent = "EXIT";
    uiExit.addEventListener("click", resetUI);
}

function playRPSRoundUI(input) {
    let comChoice = Math.floor(Math.random() * 3);
    const choiceButtons = [
        document.querySelector("#player-rock"),
        document.querySelector("#player-paper"),
        document.querySelector("#player-scissors"),
        document.querySelector("#com-rock"),
        document.querySelector("#com-paper"),
        document.querySelector("#com-scissors")
    ]
    let playerButton = choiceButtons[input];
    let comButton = choiceButtons[input + 3];
    let scoreOfPlayer = document.querySelector("#score-of-player");
    let scoreOfCom = document.querySelector("#score-of-com");
    let uiScoreboard = document.querySelector("#rps-ui-scoreboard");

    for (b of choiceButtons) {
        b.classList.remove("selected-button-winner");
        b.classList.remove("selected-button-loser");
        b.classList.add("unselected-button");
    }

    switch (true) {
        case comChoice == input: {
            //tie
            playerButton.classList.remove("unselected-button");
            playerButton.classList.add("selected-button-loser");
            comButton.classList.remove("unselected-button");
            comButton.classList.add("selected-button-loser");
            uiScoreboard.textContent = "Tie!";
            break;
        }
        case (comChoice == ((input + 1) % 3)): {
            //com win
            playerButton.classList.remove("unselected-button");
            playerButton.classList.add("selected-button-loser");
            comButton.classList.remove("unselected-button");
            comButton.classList.add("selected-button-winner");
            scoreOfCom.textContent = Number(scoreOfCom.textContent) + 1;
            uiScoreboard.textContent = "Computer Wins!";
            break;
        }
        default: {
            //player win
            playerButton.classList.remove("unselected-button");
            playerButton.classList.add("selected-button-winner");
            comButton.classList.remove("unselected-button");
            comButton.classList.add("selected-button-loser");
            scoreOfPlayer.textContent = Number(scoreOfPlayer.textContent) + 1;
            uiScoreboard.textContent = "Player Wins!";
            break;
        }

    }
}