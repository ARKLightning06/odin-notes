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
    setButtonDisabled(true);
    let playerScore = 0;
    let computerScore = 0;
    const uiContainer = document.querySelector("#rps-ui-container");
    const uiScoreboard = document.createElement("div");
    const uiRPSIcons = document.createElement("div");
    uiRPSIcons.classList.add("flex-element-horizontal");
    const rockIcon = document.createElement("img");
    const paperIcon = document.createElement("img");
    const scissorsIcon = document.createElement("img");
    const rpsIcons = [rockIcon, paperIcon, scissorsIcon];
    const rpsImages = ["./images/rock.jpg", "./images/paper.png", "./images/scissors.jpg"];
    for (i = 0; i < rpsIcons.length; i++) {
        let icon = rpsIcons[i];
        let source = rpsImages[i];
        icon.classList.add(".button-image");
        icon.src = source;
        icon.height = 100;
        icon.width = 100;
        uiRPSIcons.appendChild(icon);
    }
    uiContainer.appendChild(uiRPSIcons);
    


    setButtonDisabled(false);

    
}