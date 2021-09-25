import React, { useState, useEffect } from 'react'
import "./style.css"
import styles from 'styled-components'

const Main = styles.div`
  position: relative;
  margin:20px;
  display: flex;
  flex-wrap: wrap;
  width:760px
`
const Block = styles.div`
  height: 40px;
  width: 40px;
  position: relative;
  background: brown;
`
const VerticalLine = styles.div`
  border-left: 2px solid black;
  position: absolute;
  height: 40px;
  left: 19px;
`
const HorizontalLine = styles.div`
  border-top: 2px solid black;
  position: absolute;
  width: 40px;
  top: 19px;
`

const WhiteGo = styles.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  height: 30px;
  width: 30px;
  left: 5px;
  top: 5px;
`

const BlackGo = styles.div`
  position: absolute;
  background: black;
  border-radius: 50%;
  overflow: hidden;
  height: 30px;
  width: 30px;
  left: 5px;
  top: 5px;
`
function Unit(props) {
  function renderGo(go) {
    switch(go) {
      case 'white':
        return <WhiteGo />
        break
      case 'black':
        return <BlackGo />
        break
      default: 
        return
    }
  }
  return (
    <Block onClick={()=>{props.func(props.unit.x, props.unit.y)}}>
      <VerticalLine />
      <HorizontalLine />
      {renderGo(props.unit.occupied)}
    </Block>
  )
}

function Panel(props) {
  if(props.winner) {
    return (
      <div>{(props.winner === 'black')? '黑' : '白'}贏了</div>
    )
  }
  return (
    <div>輪到{(props.player === 'black')? '黑' : '白'}下</div>
  )
}

function Gobang() {
  let boardInit = Array.apply(null, Array(19)).map(x=>(Array.apply(null, Array(19)).map(x=>1)))
  for(let i = 0; i<boardInit.length; i++) {
    for(let j = 0; j<boardInit[i].length; j++) {
      boardInit[i][j] = {
        x:i,
        y:j,
        id: (i*boardInit[i].length + j),
        occupied: 'none'
      }
    }
  }

  const [board, setBoard] = useState(boardInit)
  const [player, setPlayer] = useState('black')
  const [winner, setWinner] = useState('')

  function setUnit(x, y) {
    if(board[x][y].occupied !== 'none') return
    if(winner) return
    const newBoard = board.map((x)=>x)
    newBoard[x][y].occupied = player
    setWinner(winCheck(newBoard, x, y, player))
    setBoard(newBoard.map((x)=>x))
    setPlayer((player === 'black')? 'white' : 'black')
  }
  function winCheck(boardState, x, y, color) {
    let result = ''
    let counter = 0
    for(let i=-4; i<=4; i++) {
      if(boardState[x] && boardState[x][y+i]) {
        if(boardState[x][y+i].occupied === color){
          counter += 1
        } else {
          counter = 0
        }
      }
      if(counter>=5) {
        result = color
      }
    }
    counter = 0
    for(let i=-4; i<=4; i++) {
      if(boardState[x+i]) {
        if(boardState[x+i][y].occupied === color){
          counter += 1
        } else {
          counter = 0
        }
      }
      if(counter>=5) {
        result = color
      }
    }
    counter = 0
    for(let i=-4; i<=4; i++) {
      if(boardState[x+i] && boardState[x+i][y+i]) {
        if(boardState[x+i][y+i].occupied === color){
          counter += 1
        } else {
          counter = 0
        }
      }
      if(counter>=5) {
        result = color
      }
    }
    counter = 0
    for(let i=-4; i<=4; i++) {
      if(boardState[x+i] && boardState[x+i][y-i]) {
        if(boardState[x+i][y-i].occupied === color){
          counter += 1
        } else {
          counter = 0
        }
      }
      if(counter>=5) {
        result = color
      }
    }
    return result
  }
  
  return (
    <div>
      <Panel player={player} winner={winner}/>
      <Main>
        {board.map(row=>(row.map((unit)=>(<Unit key={unit.id} unit={unit} func={setUnit}/>))))}
      </Main>
    </div>
  )
}

export default Gobang