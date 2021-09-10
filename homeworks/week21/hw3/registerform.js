import React, { useState, useEffect, memo, useCallback } from 'react'
import "./style.css"
import styles from 'styled-components'

const Wrapper = styles.div`
  border-top: solid 8px #fad312;
  max-width: 700px;
  margin: 0px auto;
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 40px;
  background-color: white;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`

const Submitbtn = styles.button`
  display: inline-block;
  background-color: #fad312;
  padding: 15px 32px;
  margin-top: 60px;
  border-radius: 3px;
`
const ValidateAlert = styles.div`
  color: red;
`

let validateChecker = {}

function TitleBlock() {
  return (
    <div>
      <h1>新拖延運動報名表單</h1>
      <section>
        <div className="description">
          活動日期：2020/12/10 ~ 2020/12/11
        </div>
        <div className="description">
          活動地點：台北市大安區新生南路二段1號
        </div>
      </section>
      <div className="required">
        * 必填
      </div>
    </div>
  )
}

function InputBlock(props) {
  const [value, setValue] = useState('')
  const [alert, setAlert] = useState('')
  let requireMark = ''
  if(props.validator) {
    requireMark = props.validator.includes('require')? ' *' : ''
  }
  const changeHandler = (e) => {
    setValue(e.target.value)
  }

  useEffect(()=>{
    setAlert(validate(props.validator))
  }, [value]);
  useEffect(()=>{
    validateChecker[props.id] = alert
  }, [alert]);

  function validate(rule) {
    if(!rule) return '';
    if(rule.includes('require') && !/\S/.test(value)) return '必須填寫';
    if(rule.includes('email') && !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value)) return '非合法信箱格式';
    if(rule.includes('tel') && !/^09\d{8}$/.test(value)) return '非合法手機門號';
    return '';
  }

  return (
    <div>
      <label htmlFor={props.id}><h2>{props.subject}<span style={{color: 'red'}}>{requireMark}</span></h2></label>
      <input value={value} type={props.type} placeholder={props.placeholder} id={props.id} name={props.id} onChange={changeHandler}/> 
      <ValidateAlert>{alert}</ValidateAlert>
    </div>
  )
}

function RadioGroupBlock(props) {
  const onChangeHandler = (e) => {
    console.log(e.target.value)
  }
  return (
    <div onChange={onChangeHandler}>
      <h2>報名類型</h2>
      {props.list.map((item) => (<RadioItemBlock key={'item-'+props.list.indexOf(item)} id={props.list.indexOf(item)} content={item} />))}
    </div>
  )
}

function RadioItemBlock(props) {
  return (
    <div>
      <label htmlFor={'item-'+props.id}><input type="radio" id={'item-'+props.id} name="how" value={props.content} />{props.content}</label>
    </div>
  )
}

function Registerform() {
  const submitHandler = (e) => {
    let result = Object.keys(validateChecker).every((k)=>validateChecker[k]==='')
    if(!result){
      e.preventDefault();
      alert('請填寫必填欄位')
    }
  }
  return (
    <Wrapper>
      <form onSubmit={submitHandler} action='/' method='POST' id='formTester'>
        <TitleBlock />
        <InputBlock id='nickname' subject='暱稱' placeholder='請輸入暱稱' type='text' validator={['text', 'require']} />
        <InputBlock id='email' subject='電子郵件' placeholder='您的電子郵件' type='text' validator={['email', 'require']} />
        <InputBlock id='tel' subject='手機號碼' placeholder='您的手機號碼' type='text' validator={['tel', 'require']} />
        <RadioGroupBlock list={['躺在床上用想像力實作','趴在地上滑手機找現成的','其實並沒有報名']}/>
        <InputBlock id='from' subject='怎麼知道這個活動的？' placeholder='您的回答' type='text' validator={['require']} />
        <InputBlock id='other' subject='其他建議' placeholder='您的回答' type='text'/>
        <Submitbtn>提交</Submitbtn>
      </form>
    </Wrapper>
  )
}

export default Registerform