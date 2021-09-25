import React, {Component} from 'react'
import "./style.css"
import styles from 'styled-components'

const Main = styles.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Block = styles.div`
  border: 2px solid blue;
  color: red;
  margin: 5px;
  width: 300px;
  height: 35px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
`

const Panel = styles.div`
  width: 95px;
  display: flex;
  padding: 2px;
  justify-content: space-between;
`
const Btn = styles.div`
  width: 40px;
  background: ${props => props.bgcolor||'white'};
  height:31px;
  padding: 2px;
  color:white;
  text-align: center;
  box-sizing: border-box;
`

const NewInput = styles.input`
  border: 2px solid blue;
  color: red;
  margin: 5px;
`

const FooterDiv = styles.div`
  width:300px;
  height:40px;
  border: 2px solid green;
  display: flex;
  justify-content: space-between
`

class NewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      id: 1,
      done: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }
  componentDidMount() {
    const missionData = window.localStorage.getItem('todoapp')
    if (missionData && JSON.parse(missionData).length) {
      const data = JSON.parse(missionData)
      this.setState({
        id: data[data.length-1].id + 1
      })
    }
  }
  handleChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSend(e) {
    this.setState({
      id: this.state.id +1,
      content: ''
    })
    this.props.func(e)
  }
  render() {
    const {id, content, done} = this.state
    const newObj = JSON.stringify({id, content, done})
    return (
      <div>
        <NewInput type="text" name="todo" placeholder="somthing new" value={content} onChange={this.handleChange}></NewInput>
        <button value={newObj} onClick={this.handleSend}>新增</button>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <FooterDiv>
        {this.props.children}
      </FooterDiv>
    )
  }
}

class Mission extends Component {
  render() {
    let finishedTag = '待辦'
    let finishedTagColor = 'red'
    if (this.props.obj.done){
      finishedTag = '完成'
      finishedTagColor = 'green'
    }
    return (
      <Block>
        <div>
          {this.props.obj.content}
        </div>
        <Panel>
          <Btn bgcolor={finishedTagColor} onClick={()=>{this.props.finishFunc(this.props.obj.id)}}>{finishedTag}</Btn>
          <Btn bgcolor='blue' onClick={()=>{this.props.deleteFunc(this.props.obj.id)}}>刪除</Btn>
        </Panel>
      </Block>
    )
  }
}

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      missions: [],
      filter: 'all'
    }
  }
  componentDidMount() {
    const missionData = window.localStorage.getItem('todoapp')
    if (missionData && JSON.parse(missionData).length) {
      this.setState({
        missions: JSON.parse(missionData)
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.missions !== this.state.missions) {
      window.localStorage.setItem('todoapp', JSON.stringify(this.state.missions))
    }
  }
  render() {
    const { missions, filter } = this.state
    const getNewTodo = (e) => {
      const obj = JSON.parse(e.target.value)
      if(obj.content){
        this.setState({
          missions: [...missions, obj]
        })
      }
    }
    const deleteTodo = (id) => {
      const newState = this.state.missions.filter((e)=>e.id != id)
      this.setState({
        missions: [...newState]
      })
    }
    const finishTodo = (id) => {
      const newState = this.state.missions.map((e)=>{
        if (e.id === id){
          return {id: e.id, content: e.content, done: !e.done}
        } else {
          return e
        }
      })
      this.setState({
        missions: [...newState]
      })
    }
    const clearTodo = () => {
      this.setState({
        missions: []
      })
    }
    const filterTodo = (e) => {
      if (this.state.filter === 'all'){
        return true
      } else {
        return (e.done === this.state.filter) 
      }
    }
    const changeFilter = () => {
      if(this.state.filter === 'all') {
        let state = true
        this.setState({
          filter: state
        })
      } else if (this.state.filter) {
        let state = false
        this.setState({
          filter: state
        })
      } else {
        let state = 'all'
        this.setState({
          filter: state
        })
      }
    }
    return (
      <Main>
        <NewTodo func={getNewTodo}/>
        {missions.filter(filterTodo).map((e)=>(<Mission key={e.id} obj={e} deleteFunc={deleteTodo} finishFunc={finishTodo}/>))}
        <Footer>
          <Btn bgcolor='purple' onClick={clearTodo}>清空</Btn>
          <div>按右邊這個按鍵就可以篩選→</div>
          <Btn bgcolor='purple' onClick={changeFilter}>{(filter === 'all')? '全部' : (filter? '完成' : '待辦')}</Btn>
        </Footer>
      </Main>
    )
  }
}

export default Todo