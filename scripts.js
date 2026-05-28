if (document.body.classList.contains("javascript-notes-body")) {
    const rochambeauButtonText = document.querySelector("#rochambeau-v1");
    const rochambeauButtonUI = document.querySelector("#rochambeau-v2");
    rochambeauButtonText.addEventListener("click", playRPSGameText);
    rochambeauButtonUI.addEventListener("click", playRPSGameUI)
}

function setButtonDisabled(isActive) {
    const rochambeauButtonText = document.querySelector("#rochambeau-v1");
    const rochambeauButtonUI = document.querySelector("#rochambeau-v2");
    rochambeauButtonText.disabled = isActive;
    rochambeauButtonUI.disabled = isActive;
}

function resetUI() {
    const uiRPSContainer = document.querySelector("#rps-ui-container");
    const uiScoreboard = document.querySelector("#rps-ui-scoreboard");
    const uiPlayerSide = document.querySelector("#rps-ui-playerside");
    const uiMiddleSide = document.querySelector("#rps-ui-middleside");
    const uiComputerSide = document.querySelector("#rps-ui-computerside");
    uiPlayerSide.replaceChildren();
    uiMiddleSide.replaceChildren();
    uiComputerSide.replaceChildren();
    uiScoreboard.textContent = "";
    uiRPSContainer.classList.remove("flaming-text");
}


function playRPSGameText() {
    setButtonDisabled(true);
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
    setButtonDisabled(false);
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
    //deactivate button to avoid calling same function
    setButtonDisabled(true);

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
    const rpsIDs = ["#player-rock", "#player-paper", "#player-scissors", "#com-rock", "#com-paper", "#com-scissors"];

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
    uiPlayerSide.appendChild(playerLabel);
    uiComputerSide.append(comLabel);
    uiPlayerSide.appendChild(scoreOfPlayer);
    uiComputerSide.append(scoreOfCom);
    for (i = 0; i < playerRPSIcons.length; i++) {
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
        uiPlayerSide.appendChild(playerIcon);
        uiComputerSide.appendChild(comIcon);
    }
    uiMiddleSide.textContent = "VS.";
    setButtonDisabled(false);
    
}