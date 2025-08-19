 let playerScore = 0;
        let computerScore = 0;
        let tieScore = 0;

        const choices = {
            rock: { emoji: '✊', name: 'Pedra' },
            paper: { emoji: '✋', name: 'Papel' },
            scissors: { emoji: '✌️', name: 'Tesoura' }
        };

        function getComputerChoice() {
            const options = ['rock', 'paper', 'scissors'];
            return options[Math.floor(Math.random() * options.length)];
        }

        function determineWinner(playerChoice, computerChoice) {
            if (playerChoice === computerChoice) {
                return 'tie';
            }
            
            if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                return 'player';
            }
            
            return 'computer';
        }

        function updateDisplay(playerChoice, computerChoice, result) {
            const playerChoiceEl = document.getElementById('playerChoice');
            const computerChoiceEl = document.getElementById('computerChoice');
            const resultMessageEl = document.getElementById('resultMessage');

            // Animate choices
            playerChoiceEl.style.transform = 'scale(0.8)';
            computerChoiceEl.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                playerChoiceEl.textContent = choices[playerChoice].emoji;
                computerChoiceEl.textContent = choices[computerChoice].emoji;
                playerChoiceEl.style.transform = 'scale(1)';
                computerChoiceEl.style.transform = 'scale(1)';
                
                // Remove previous winner classes
                playerChoiceEl.classList.remove('winner');
                computerChoiceEl.classList.remove('winner');
                
                // Add winner class
                if (result === 'player') {
                    playerChoiceEl.classList.add('winner');
                } else if (result === 'computer') {
                    computerChoiceEl.classList.add('winner');
                }
            }, 150);

            // Update result message
            let message = '';
            let messageClass = '';
            
            if (result === 'tie') {
                message = `Empate! Ambos escolheram ${choices[playerChoice].name}`;
                messageClass = 'tie';
            } else if (result === 'player') {
                message = `🎉 Você ganhou! ${choices[playerChoice].name} vence ${choices[computerChoice].name}`;
                messageClass = 'win';
            } else {
                message = `😔 Você perdeu! ${choices[computerChoice].name} vence ${choices[playerChoice].name}`;
                messageClass = 'lose';
            }
            
            resultMessageEl.textContent = message;
            resultMessageEl.className = `result-message ${messageClass} fade-in`;
        }

        function updateScore() {
            document.getElementById('playerScore').textContent = playerScore;
            document.getElementById('computerScore').textContent = computerScore;
            document.getElementById('tieScore').textContent = tieScore;
        }

        function playGame(playerChoice) {
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);
            
            // Update scores
            if (result === 'player') {
                playerScore++;
            } else if (result === 'computer') {
                computerScore++;
            } else {
                tieScore++;
            }
            
            updateDisplay(playerChoice, computerChoice, result);
            updateScore();
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            tieScore = 0;
            
            document.getElementById('playerChoice').textContent = '❓';
            document.getElementById('computerChoice').textContent = '❓';
            document.getElementById('resultMessage').textContent = 'Escolha sua jogada para começar!';
            document.getElementById('resultMessage').className = 'result-message';
            
            // Remove winner classes
            document.getElementById('playerChoice').classList.remove('winner');
            document.getElementById('computerChoice').classList.remove('winner');
            
            updateScore();
        }

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'r':
                    playGame('rock');
                    break;
                case 'p':
                    playGame('paper');
                    break;
                case 's':
                    playGame('scissors');
                    break;
                case 'escape':
                    resetGame();
                    break;
            }
        });




