




/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]




/*---------------------------- Variables (state) ----------------------------*/

let board: number[], turn: number, winner: boolean, tie: boolean


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')

const messageEl = document.getElementById('#message')

const resetBtnEl = document.querySelector('Btn')!

/*----------------------------- Event Listeners -----------------------------*/


document.querySelector('.board')!.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn = 1
  winner = false
  tie = false
  render()
 
}


function render() {
  updateBoard()
  updateMessage()

}




function updateBoard() {
  board.forEach((element, idx) => {
      if (element === 1) {
          squareEls[idx].textContent = "X"
      } else if (element === -1) {
          squareEls[idx].textContent = "O"
      } else {
          squareEls[idx].textContent = ""
      }
  })
}



function updateMessage() {
  if (winner === false && tie === false) {

      if (turn === 1) {
          messageEl.textContent = "X's" + " turn"
      } else {
          messageEl.textContent = "O's" + " turn"
      }

  } else if (winner === false && tie === true) {
      messageEl.textContent = "Yall's Tied"
  } else {
      messageEl.textContent = "Winner,Winner, Chicken Dinner!"

  }


}






function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id.slice(evt.target.id.length - 1))
  console.log(evt.target.id[evt.target.id.length - 1])
  console.log(sqIdx)
  if (board[sqIdx] || winner === true) {
      return;
  }

  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()

  render()
}


function placePiece(index) {
  board[index] = turn
}



function checkForTie() {
  for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
          return;
      }
  }
  tie = true
}


function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
      let total = 0
      winningCombos[i].forEach(element => {
          total += board[element]
      })
      total = Math.abs(total)
      if (total === 3) {
          winner = true
      }
  }
}

function switchPlayerTurn() {
  if (winner === true) {
      return;
  }

  turn *= -1
}



























