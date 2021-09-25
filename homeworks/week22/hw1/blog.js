import React, { useState, useEffect, useLayoutEffect, createContext, useContext } from 'react'
import styles from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useParams
} from "react-router-dom";

const AuthContext = createContext(null)

const AboutDiv = styles.div`
  color: blue;
  margin-left:20vw;
`

const NewPostDiv = styles.div`
  margin-top:20px;
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
`

const NewPostTextarea = styles.textarea`
  margin-top:20px;
  margin-bottom:20px;
  width: 400px;
`

const NavDiv = styles.div`
  width: 100%;
  border:2px solid green;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  box-sizing: border-box;
`

const NavlistDiv = styles.div`
  height:100%;
  display: flex;
  justify-content: space-between;
`

const NavbuttonDiv = styles.div`
  height: 100%;
  background: rgba(0,0,0,0.1);
  padding: 22px 40px;
  margin: 0px 10px;
  box-sizing: border-box;
  text-decoration: none;
  text-align:center;
`

const PostsDiv = styles.div`
  width:100vw;
  height:90vh;
  display: flex;
  flex-direction:column;
  align-items:center;
  box-sizing: border-box;
  margin-top: 15px
`

const PostUnitDiv = styles.div`
  width:900px;
  background: white;
  box-sizing: content-box;
  margin:10px 0px;
  border:2px solid green;
  border-radius:25px;
  display:flex;
  flex-direction:column;
  padding:20px;
  text-decoration:none;
`

const PostTitleH1 = styles.h1`
  color: rgb(100,150,200);
  margin:10px 0px;
`

const PostPreviewDiv = styles.div`
  align-self: center;
  margin:0px 30px;
`

const PostParagraphDiv = styles.div`
  margin:5px 0px;
  color:black;
`

const PostInfoDiv = styles.div`
  color: rgb(200,150,100);
  align-self: flex-end;
`


function RequireAuthRoute({ children, ...rest }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function login(BASE_URL, loginData, cb){
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({...loginData})
  })
  .then(res => res.json())
  .then(resData => {
    if (resData.ok){
      window.localStorage.setItem('blog', resData.token)
      authWithToken("https://student-json-api.lidemy.me", cb)
    } else {
      console.log(resData)
    }
  })
}

function LoginBlock(props) {
  const history = useHistory()
  const { setCurrentUser } = useContext(AuthContext);
  const [data, setData] = useState({ username:'', password:''})
  const onChangeHandler = (e) => {
    const newData = {...data}
    newData[e.target.name] = e.target.value
    setData({...newData})
  } 
  const onSubmitHandler = (e) => {
    login('https://student-json-api.lidemy.me', data, setCurrentUser)
    history.push('/')
  }
  return (
    <div>
      使用者帳號：<input type='text' name='username' value={data.username} onChange={onChangeHandler}/>
      <br/>
      　密　碼　：<input type='password' name='password' value={data.password} onChange={onChangeHandler}/>
      <br/>
      <button onClick={onSubmitHandler}>登入</button>
    </div>
  )
}

function register(BASE_URL, registerData) {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({...registerData})
  })
  .then(res => res.json())
  .then(data => {
    if (resData.ok){
      window.localStorage.setItem('blog', resData.token)
    } else {
      console.log(resData)
    }
  })
}

function RegisterBlock(props) {
  const [data, setData] = useState({ username:'', nickname:'', password:''})
  const onChangeHandler = (e) => {
    const newData = {...data}
    newData[e.target.name] = e.target.value
    setData({...newData})
  } 
  const onSubmitHandler = (e) => {
    console.log(data)
    fetch('https://student-json-api.lidemy.me/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...data})
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
  return (
    <div>
      使用者帳號：<input type='text' name='username' value={data.username} onChange={onChangeHandler}/>
      <br/>
      使用者暱稱：<input type='text' name='nickname' value={data.nickname} onChange={onChangeHandler}/>
      <br/>
      　密　碼　：<input type='password' name='password' value={data.password} onChange={onChangeHandler}/>
      <br/>
      <button onClick={onSubmitHandler}>註冊</button>
    </div>
  )
}

function PostUnitBlock(props) {
  const { id, title, body, createdAt, user } = props.obj
  let keyId = id
  return(
    <PostUnitDiv as={Link} to={'/post/'+id}>
      <PostTitleH1>●{title}</PostTitleH1>
      <PostPreviewDiv>
        {body.substr(0,200).split('\n').map((str)=>(<PostParagraphDiv key={keyId+=1000}>{str}</PostParagraphDiv>))}
        {!(body === body.substr(0,200)) && <div>（全文內收）</div>}
      </PostPreviewDiv>

      <PostInfoDiv>From: {user.nickname} </PostInfoDiv>
      <PostInfoDiv>{new Date(createdAt).toLocaleString()}</PostInfoDiv>
    </PostUnitDiv>
  )
}

function SinglePostBlock() {
  let { postId } = useParams();
  const [singlePost, setSinglePost] = useState({body:'', user:{}});
  useEffect(()=>{
    console.log("id is", postId)
    fetch(`https://student-json-api.lidemy.me/posts?id=${postId}&_expand=user`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setSinglePost(json[0])
      })
  },[])
  const { id, title, body, createdAt, user } = singlePost
  return(
    <PostsDiv>
      <PostUnitDiv>
        <PostTitleH1>●{title}</PostTitleH1>
        <PostPreviewDiv>
          {body.split('\n').map((str)=>(<PostParagraphDiv key={str}>{str}</PostParagraphDiv>))}
        </PostPreviewDiv>
        <PostInfoDiv>From: {user.nickname} </PostInfoDiv>
        <PostInfoDiv>{new Date(createdAt).toLocaleString()}</PostInfoDiv>
      </PostUnitDiv>
    </PostsDiv>
  )
}

function PostsBlock() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  useEffect(()=>{
    fetch(`https://student-json-api.lidemy.me/posts?_sort=createdAt&_order=desc&_start=${(page-1)*5}&_end=${(page)*5}&_expand=user`)
      .then(res => res.json())
      .then(json => {
        setPosts(json)
      })
  },[page])
  const pageHandler = (direction)=>{
    let newPage = page + direction
    setPage(Math.max(1, newPage))
  }
  return(
    <PostsDiv>
      <div><span onClick={()=>{pageHandler(-1)}}>上一頁</span> <span>第{page}頁</span> <span onClick={()=>{pageHandler(1)}}>下一頁</span></div>
      {posts.map((e)=>(
        <PostUnitBlock obj={e} key={e.id} />
      ))}
    </PostsDiv>
  )
}

function NavbarBlock(){
  const history = useHistory()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const handleLogout = ()=>{
    window.localStorage.removeItem('blog')
    authWithToken("https://student-json-api.lidemy.me", setCurrentUser)
    history.push('/')
  }
  return(
    <div>
      <NavDiv>
        <NavlistDiv>
          <NavbuttonDiv as={Link} to='/'>首頁</NavbuttonDiv>
          <NavbuttonDiv as={Link} to='/about'>關於</NavbuttonDiv>
        </NavlistDiv>
        <NavlistDiv>
          {!currentUser && <NavbuttonDiv as={Link} to='/register'>註冊</NavbuttonDiv>}
          {!currentUser && <NavbuttonDiv as={Link} to='/login'>登入</NavbuttonDiv>}
          {currentUser && <NavbuttonDiv as={Link} to='/newpost'>發文</NavbuttonDiv>}
          {currentUser && <NavbuttonDiv onClick={handleLogout}>登出</NavbuttonDiv>}
        </NavlistDiv>
      </NavDiv>
    </div>
  )
}

function AboutBlock() {
  return(
    <AboutDiv>
      <h1>這個網頁是什麼？</h1>
      <p>我的作業。</p>
    </AboutDiv>
  )
}

function NewPostBlock() {
  const [title, setTitle] = useState('新文章')
  const [content, setContent] = useState('文章內容')
  const [submit, setSubmit] = useState(false)
  const titleHandler = (e)=>{
    setTitle(e.target.value)
  }
  const contentHandler = (e)=>{
    setContent(e.target.value)
  } 
  const onSubmitHandler = ()=>{
    const token = window.localStorage.getItem('blog')
    fetch('https://student-json-api.lidemy.me/posts', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body: content
      })
    })
    .then(res => res.json())
    .then(data => {
      setSubmit(true)
    })
  }
  return(
    <NewPostDiv>
      {submit && <Redirect to='/' />}
      <input value={title} onChange={titleHandler}/>
      <NewPostTextarea rows='10' value={content} onChange={contentHandler}/>
      <button onClick={onSubmitHandler}>送出</button>
    </NewPostDiv>
  )
}

function authWithToken(BASE_URL, setUserFunc, setIsLoadingFunc){
  const token = window.localStorage.getItem('blog')
  if(token) {
    return fetch(`${BASE_URL}/me`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok){
        const result = data.data
        setUserFunc(result)
      } else {
        console.log(data)
      }
      setIsLoadingFunc(true)
    })
  } else {
    setUserFunc(null)
    setIsLoadingFunc(true)
  }
}


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    authWithToken("https://student-json-api.lidemy.me", setCurrentUser, setIsLoading)
  },[])

  return(
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
    <Router>
      <NavbarBlock />
      {isLoading && (<Switch>
        <Route exact path="/">
          <PostsBlock />
        </Route>
        <Route path="/about">
          <AboutBlock />
        </Route>
        <Route path={`/post/:postId`}>
          <SinglePostBlock />
        </Route>
        <Route path="/register">
          <RegisterBlock />
        </Route>
        <Route path="/login">
          {currentUser? <Redirect to="/" />: <LoginBlock />}
        </Route>
        <RequireAuthRoute path="/newpost">
          <NewPostBlock />
        </RequireAuthRoute>
      </Switch>)}
    </Router>
    </AuthContext.Provider>
  )
}

export default App