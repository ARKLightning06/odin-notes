if (document.body.classList.contains("javascript-notes-body")) {
    const rochambeauButton = document.querySelector("#rochambeau");
    rochambeauButton.addEventListener("click", playRPSGame);
}



function playRPSGame() {
    let playerScore = 0;
    let computerScore = 0;
    alert("Let's player rock paper scissors! First to three wins.");
    while (playerScore < 3 & computerScore < 3) {
        let result = playRPSRound();
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

function playRPSRound() {
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