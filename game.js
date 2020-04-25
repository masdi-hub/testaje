/**
 * Phase 1
 * 1. Attach click events on each box to place X
 * 2. Alternate between X and O after each placement
 *     - have a counter, place X if counter is odd, O if even.
 * 3. Prevent a filled box to be placed with marker
 *     - use if-else
 *
 * Phase 2
 * 4. Check for winner after each marker placement
 * 5. Display message accordingly for Winner (X or O) or Draw
 * 6. Option to play again
 *
 * Phase 3 (optional)
 * 7. Dumb AI - randomly place marker in empty boxes
 * 8. Smart AI - Always win/draw
 */

// winning index combination

const board = document.getElementById('board')
const message = document.getElementById('message')
const boxes = document.querySelectorAll('.box')
const restartBtn = document.getElementById('restart-btn')


let turn = 1

function getCurrentMarker() {
  if (turn % 2 == 0) {
    return 'O'
  } else {
    return 'X'
  }
}

function displayPlayerTurn() {
  message.innerText = `Player ${getCurrentMarker()}'s Turn`
}

const winningCombo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function hasWinner() {
  // Long way
  // if (boxes[0].innerText === boxes[1].innerText && boxes[1].innerText === boxes[2].innerText && boxes[0].innerText.length !== 0) { return true }
  // if (boxes[3].innerText === boxes[4].innerText && boxes[4].innerText === boxes[5].innerText && boxes[3].innerText.length !== 0) { return true }
  // if (boxes[6].innerText === boxes[7].innerText && boxes[7].innerText === boxes[8].innerText && boxes[6].innerText.length !== 0) { return true }
  // if (boxes[0].innerText === boxes[3].innerText && boxes[3].innerText === boxes[6].innerText && boxes[0].innerText.length !== 0) { return true }
  // if (boxes[1].innerText === boxes[4].innerText && boxes[4].innerText === boxes[7].innerText && boxes[1].innerText.length !== 0) { return true }
  // if (boxes[2].innerText === boxes[5].innerText && boxes[5].innerText === boxes[8].innerText && boxes[2].innerText.length !== 0) { return true }
  // if (boxes[0].innerText === boxes[4].innerText && boxes[4].innerText === boxes[8].innerText && boxes[0].innerText.length !== 0) { return true }
  // if (boxes[2].innerText === boxes[4].innerText && boxes[4].innerText === boxes[6].innerText && boxes[2].innerText.length !== 0) { return true }
  // return false

  // Refactored Code
  let hasWinner = false
  winningCombo.forEach(combo => {
    if (
      boxes[combo[0]].innerText === boxes[combo[1]].innerText &&
      boxes[combo[1]].innerText === boxes[combo[2]].innerText &&
      boxes[combo[0]].innerText.length !== 0
    ) {
      hasWinner = true
    }
  })
  return hasWinner
}

function gameOver() {
  board.style.pointerEvents = 'none'
  // You can use JS to create the HTML Button
  // const button = document.createElement('button')
  // button.id = 'restart-btn'
  // button.innerText = 'Play Again!'
  // document.body.append(button)

  // Or you can use CSS to unhide a existing HTML Button
  restartBtn.style.display = 'block'
  restartBtn.addEventListener('click', () => {
    // Long way:
    // turn = 1
    // boxes.forEach(box => {
    //   box.innerText = ''
    // })
    // displayPlayerTurn()
    // board.style.pointerEvents = 'all'
    // restartBtn.style.display = 'none'

    // Shortcut:
    window.location.reload()
  })
}

function startGame() {
  displayPlayerTurn()
  boxes.forEach(box => {
    box.addEventListener('click', event => {
      if (box.innerText !== '') return

      box.innerText = getCurrentMarker()

      if (hasWinner()) {
        message.innerText = 'SOMEONE HAS WON!'
        gameOver()
        return
      }

      if (!hasWinner() && turn === 9) {
        message.innerText = 'It is a draw!'
        gameOver()
        return
      }

      turn++
      displayPlayerTurn()
    })
  })
}

startGame()






// another approach without startGame function()

// displayPlayerTurn()
// boxes.forEach(box => {
//   box.addEventListener('click', event => {
//     if (box.innerText === '') {
//       // placing marker
//       box.innerText = getCurrentMarker()

//       if (hasWinner()) {
//         message.innerText = 'SOMEONE HAS WON!'
//       } else {
//         // when there is no winner yet
//         if (turn === 9) {
//           message.innerText = 'It is a draw!'
//         } else {
//           // proceed to next round if no winner/draw
//           turn++
//           displayPlayerTurn()
//         }
//       }
//     }
//   })
// })
