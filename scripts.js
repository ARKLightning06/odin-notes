// Scripts for the odin-notes file
// currently just has RPS text and ui versions...
// note that these could be significantly cleaned up using classes as a future project

class SketchCell {
    //class containing a single cell in a SketchGrid
    constructor(row, col, color, rowContainer, sketchGrid) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.rowContainer = rowContainer;
        this.cell = this.createDiv();
        this.cell.addEventListener("mouseenter", this.changeColor.bind(this));
        this.cell.addEventListener("mouseenter", this.adjustDarken.bind(this));
        this.sketchGrid = sketchGrid;
        this.darkenVal = 1;
    }

    createDiv() {
        const cell = document.createElement("div");
        cell.classList.add("sketch-cell");
        this.rowContainer.appendChild(cell);
        return cell;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    changeColor() {
        this.cell.style.background = this.color;
        this.adjustDarken();
    }

    setDarken(newDark) {
        this.darkenVal = newDark;
    }

    setBorders(isBordered) {
        if (isBordered) {
            this.cell.style.border = "1px solid #A9B3D6";
        }
        else {
            this.cell.style.border = "none";
        }
    }


    adjustDarken() {
        if (!this.sketchGrid.getIsErase()) {
            this.darkenVal = Math.min(this.darkenVal + 0.05, 1);
            this.cell.style.opacity = this.darkenVal;
        }
    }

}

class SketchGrid {
    constructor(container, size, color) {
        this.container = container;
        this.size = size;
        this.color = color;
        this.isErase = false;
        this.grid = this.drawGrid();
        this.isDarken = false;
        this.isBordered = false;
    }

    resetContainer() {
        this.container.replaceChildren();
    }

    setSize(newSize) {
        this.size = newSize;
    }

    setColor(newColor) {
        this.color = newColor;
        if (!this.isErase) {
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    this.grid[r][c].setColor(newColor);
                }
            }
        }
    }

    setErase(isErasing) {
        if (isErasing) {
            let tempColor = this.color;
            this.setColor("#EDEEF2");
            this.isErase = isErasing;
            this.color = tempColor;
        }
        else {
            this.isErase = isErasing;
            this.setColor(this.color);
        }
        //this seemingly weird piece of code will reset all darkenvalues sittings somewhere between 0.5 and 1
        this.setDarken(!this.isDarken);
        this.setDarken(!this.isDarken);
    }

    setDarken(isDarken) {
        this.isDarken = isDarken;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let newDark = isDarken ? 0.5 : 1;

                //slightly flawed as it resets any previously set darken values, oh well
                this.grid[r][c].setDarken(newDark);
            }
        }
    }

    setBorders(isBordered) {
        this.isBordered = isBordered;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                this.grid[r][c].setBorders(isBordered);
            }
        }
    }

    getIsErase() {
        return this.isErase;
    }

    getIsDarken() {
        return this.isDarken;
    }

    drawGrid() {
        //draw and return an n x n grid where n is this.size
        this.resetContainer();
        let grid = [];
        for (let r = 0; r < this.size; r++) {
            grid.push([]);
            let sketchRow = document.createElement("div");
            sketchRow.classList.add("sketch-row");
            for (let c = 0; c < this.size; c++) {
                let cell = new SketchCell(r, c, this.color, sketchRow, this);
                grid[r].push(cell);
            }
            this.container.appendChild(sketchRow);
        }
        return grid;
    }

    redrawGrid(newSize) {
        this.setSize(newSize);
        this.grid = this.drawGrid();
    }
}

// Odin Calculator Project

class OdinCalculator {
    //class to contain input and output for the calculator, as well as the methods
    constructor(outputTop, outputBottom) {
        this.outputTop = outputTop;
        this.outputBottom = outputBottom;
        this.leftNum = 0;
        this.leftStr = "";
        this.operatorIndex = -1;
        this.rightNum = undefined;
        this.rightStr = undefined;
        this.operators = ["+", "-", "\u00D7", "\u00F7"];
        this.isOldNum = false; //to handle when leftNum is set to result of an operation
        this.wrath = 0; // to track the wrath of the gods
    }

    inputNum(num) {
        this.resetWrathEffects();
        if (this.isOldNum) {
            this.isOldNum = false;
            this.leftNum = 0;
            this.leftStr = "";
        }
        if (this.operatorIndex == -1 && (this.leftStr.length < 10 || num == "Backspace")) {
            this.adjustLeftNum(num.toString());
        }
        else if (this.rightStr.length < 10 || num == "Backspace") {
            this.adjustRightNum(num.toString());
        }
        this.updateOutput();
    }

    adjustLeftNum(digit) {
        if (digit == "Backspace") {
            this.leftStr = this.leftStr.slice(0, this.leftStr.length - 1);
            this.leftNum = +this.leftStr;
        }
        else if (!(this.leftStr.includes(".") && digit == ".")) {
            this.leftStr += digit;
            this.leftNum = +this.leftStr;
        }        
    }

    adjustRightNum(digit) {
        if (digit == "Backspace") {
            this.rightStr = this.rightStr.slice(0, this.rightStr.length - 1);
            this.rightNum = +this.rightStr;
        }
        else if (!(this.rightStr.includes(".") && digit == ".")) {
            this.rightStr += digit;
            this.rightNum = +this.rightStr;
        }        
    }

    inputOperator(operatorIndex) {
        this.resetWrathEffects();
        this.isOldNum = false;
        if (typeof this.rightStr !== "undefined" && this.rightStr != "") {
            this.evaluate(false);
        }
        this.operatorIndex = operatorIndex;
        this.updateOutput();
        this.rightNum = 0;
        this.rightStr = "";
    }

    evaluate(isNewEquation=true) {
        this.resetWrathEffects();
        if (typeof this.rightStr !== "undefined" && this.rightStr != "") {
            let result = 'ERROR';
            switch (this.operatorIndex) {
                case (0): {
                    result = this.leftNum + this.rightNum;
                    break;
                }
                case (1): {
                    result = this.leftNum - this.rightNum;
                    break;
                }
                case (2): {
                    result = this.leftNum * this.rightNum;
                    break;
                }
                case (3): {
                    if (this.rightNum === 0) {
                        console.log(this.rightNum);
                        this.incurWrath();
                        return;
                    }
                    result = this.leftNum / this.rightNum;
                    break;
                }
                default: {
                    break;
                }
            }
            this.updateOutput(true, result);
            this.operatorIndex = -1;
            this.rightNum = undefined;
            this.rightStr = undefined;
            this.leftNum = result;
            this.leftStr = result.toString();
            this.isOldNum = isNewEquation;
        }
        else {
            this.clear();
        }
    }

    updateOutput(isEvaluated, evaluated = 0) {
        if ((typeof this.rightStr !== "undefined") && this.rightStr != "" && isEvaluated) {
            this.outputTop.textContent = this.parseNum(evaluated);
            this.outputBottom.textContent = `${this.parseNum(this.leftNum)} ${this.operators[this.operatorIndex]} ${this.parseNum(this.rightNum)} =`;
        }
        else if (typeof this.rightStr !== "undefined" && this.rightStr != "") {
            this.outputTop.textContent = this.parseNum(this.rightNum);
            if (this.rightStr.includes(".")) {
                this.outputTop.textContent = this.rightStr;
            }
            this.outputBottom.textContent = '';
        }
        else if (this.operatorIndex != -1) {
            this.outputTop.textContent = this.operators[this.operatorIndex];
            this.outputBottom.textContent = '';
        }
        else {
            this.outputTop.textContent = this.parseNum(this.leftNum);
            if (this.leftStr.includes(".")) {
                this.outputTop.textContent = this.leftStr;
            }

            this.outputBottom.textContent = '';
        }
    }

    parseNum(num) {
        return Math.abs(num) >= 1000000 || (Math.abs(num) < 0.0000001 && num != 0) ? num.toExponential(1) : +num.toFixed(4);
    }

    clear() {
        this.resetWrathEffects();
        this.outputTop.textContent = 0;
        this.outputBottom.textContent = '';
        this.leftNum = 0;
        this.leftStr = "";
        this.operatorIndex = -1;
        this.rightNum = undefined;
        this.rightStr = undefined;
        this.isOldNum = false;
    }

    incurWrath() {
        switch (this.wrath) {
            case(0): {
                this.clear();
                this.outputTop.style.alignSelf = "center";
                this.outputTop.classList.add("calc-wrath");
                this.outputTop.textContent = "Foolish mortal";
                this.outputBottom.textContent = "Meddle not in that which you do not understand";
                break;
            }
            case(1): {
                this.clear();
                this.outputTop.style.alignSelf = "center";
                this.outputTop.classList.add("calc-wrath");
                this.outputBottom.classList.add("calc-wrath");
                this.outputTop.textContent = "You Dare?";
                this.outputBottom.textContent = "Your insolence is dangerous, pathetic dog";
                break;
            }
            case(2): {
                this.clear();
                this.outputTop.style.alignSelf = "center";
                this.outputTop.classList.add("calc-wrath");
                this.outputBottom.classList.add("calc-wrath");
                document.querySelector("#calc-box").style.border = "5px solid #ff0000";
                this.outputTop.textContent = "Vile Wretch!";
                this.outputBottom.textContent = "This is your last warning, or you shall burn forever in the fires of Helheim!";
                break;
            }
            case(3): {
                this.clear();
                this.outputTop.style.alignSelf = "center";
                this.outputTop.classList.add("calc-wrath");
                this.outputBottom.classList.add("calc-wrath");
                document.querySelector("#calc-box").style.border = "5px solid #ff0000";
                document.querySelector("#calc-frame").style.border = "7px solid #ff0000";
                document.querySelector("#calc-title").style.color = "#ff0000";
                this.outputTop.textContent = "";
                this.outputBottom.textContent = "For this offense, you are sentenced the Blood Eagle. Your back shall be slashed open, ribs severed, and lungs unfurled as you wallow in agony, vile scum.";
                break;
            }
            case(4): {
                this.clear();
                this.outputTop.style.alignSelf = "center";
                this.outputTop.classList.add("calc-wrath");
                this.outputBottom.classList.add("calc-wrath");
                document.querySelector("#calc-box").style.border = "5px solid #ff0000";
                document.querySelector("#calc-frame").style.border = "7px solid #ff0000";
                document.querySelector("#calc-title").style.color = "#ff0000";
                this.outputTop.textContent = "Níðingr";
                this.outputBottom.textContent = "Words cannot describe your lowliness. Only the gods can give you the torment you deserve.";
                break;
            }
            default: {
                window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }
        }
        this.wrath += 1;
    }

    resetWrathEffects() {
        this.outputTop.classList.remove("calc-wrath");
        this.outputBottom.classList.remove("calc-wrath");
        this.outputTop.style.alignSelf = "flex-end";
        document.querySelector("#calc-box").style.border = "5px solid #0E0E0E";
        document.querySelector("#calc-frame").style.border = "5px double #5E4638";
        document.querySelector("#calc-title").style.color = "#5E4638";

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
    const sketchGrid = new SketchGrid(container, 16, "#05060A");
    const sizeSelector = document.querySelector("#sketch-settings-size");
    sizeSelector.addEventListener("change", (event) => sketchGrid.redrawGrid(Number(event.target.value)));
    const colorSelector = document.querySelector("#sketch-settings-color");
    colorSelector.addEventListener("change", (event) => sketchGrid.setColor(event.target.value));
    const eraseSelector = document.querySelector("#sketch-settings-erase");
    eraseSelector.addEventListener("change", (event) => sketchGrid.setErase(event.target.checked));
    const darkenSelector = document.querySelector("#sketch-settings-darken");
    darkenSelector.addEventListener("change", (event) => sketchGrid.setDarken(event.target.checked));
    const borderSelector = document.querySelector("#sketch-settings-border");
    borderSelector.addEventListener("change", (event) => sketchGrid.setBorders(event.target.checked));
}

else if (document.body.classList.contains("odin-calculator-body")) {
    // find elements to manipulate
    const calcContainerTop = document.querySelector("#calc-top-top");
    const calcContainerBottom = document.querySelector("#calc-top-bottom");

    // initiate class to store data
    const odinCalc = new OdinCalculator(calcContainerTop, calcContainerBottom);

    // set up keybinds
    const validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace", "."];
    const validKeyOperations = ["+", "-", "*", "/"];
    document.addEventListener("keydown", (event) => {
        if (validKeys.includes(event.key)) {
            odinCalc.inputNum(event.key.toString());
        }
        else if (validKeyOperations.includes(event.key)) {
            odinCalc.inputOperator(validKeyOperations.indexOf(event.key));
        }
        else if (event.key === "=" || event.key === "Enter") {
            odinCalc.evaluate();
        }
        else if (event.key === "c") {
            odinCalc.clear();
        }
    });

    // set up buttons
    const calcNumbers = [...document.querySelectorAll(".calc-number")];
    for (let i = 0; i < calcNumbers.length; i++) {
        let num = (i + 1) % 10;
        calcNumbers[i].addEventListener("click", () => odinCalc.inputNum(num));
    }
    const calcOperations = [...document.querySelectorAll('.calc-operator')];
    for (let i = 0; i < calcOperations.length; i++) {
        calcOperations[i].addEventListener("click", () => odinCalc.inputOperator(i));
    }
    const calcEquals = document.querySelector("#calc-equals");
    calcEquals.addEventListener("click", () => odinCalc.evaluate());
    const calcClear = document.querySelector("#calc-clear");
    calcClear.addEventListener("click", () => odinCalc.clear());
    const calcBackspace = document.querySelector("#calc-backspace"); 
    calcBackspace.addEventListener("click", () => odinCalc.inputNum("backspace"));
    const calcDecimal = document.querySelector("#calc-decimal");
    calcDecimal.addEventListener("click", () => odinCalc.inputNum("."));
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
    let comButton = choiceButtons[comChoice + 3];
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