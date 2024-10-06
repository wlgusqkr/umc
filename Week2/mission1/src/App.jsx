import { useState } from 'react';
import './App.css'

function App() {

  let [count, setCount] = useState(1);
  const autoIncreaseCount = () => {
    setCount(prev => prev + 1); // prev++는 안되고 prev + 1이 되는 이유는 뭘까?
    return count;
  }

  const [TodoListArr, setTodoListArr] = useState([]);
  const [inputText, setInputText] = useState();
  const [isModify, setIsModify] = useState(0);

  const register = () => {
    setTodoListArr(prev => [...prev, { id: autoIncreaseCount(), text: inputText }])
  }

  const handleInputText = (e) => {
    setInputText(e.target.value);
  }

  const handleDelete = (deleteId) => {
    let filteredList = TodoListArr.filter((element) => {
      return element.id != deleteId
    })
    setTodoListArr(filteredList);
  }

  const handleUpdate = (updateId, e) => {

    let newList, filteredListIndex;


    filteredListIndex = TodoListArr.findIndex((element) => {
      if(element.id == updateId) {
        return true;
      }
    })
    newList = TodoListArr.with(filteredListIndex, {id : updateId, text: e.target.value})
    setTodoListArr(newList);
  }

  const handleIsModify = (index) => {
    if(index == 0) {
      setIsModify(0);
    } else {
      setIsModify(index);
    }
  }

  return (
    <>
      <h2 className='title'>TodoList</h2>
      <div className='sub-title'>
        <h4>할일등록</h4>
        <div className='contents'>
          <INPUT class1={'customInput'} changeFunction={handleInputText}></INPUT>
          <div className='delete'>
            <button className='but' onClick={register}>등록하기</button>
          </div>
        </div>
      </div>

      <div className='main-box'>
        {TodoListArr.map((element, index) => {
          return (
            <div className='contents' key={index}>
              <div className='text'>
                {isModify == element.id
                  ? <INPUT class1='modifyInput' value1={element.text} changeFunction={(e) => { handleUpdate(element.id, e)}}/>
                  : <p>{element.text}</p>}
              </div>
              <div className='delete'>
                <BUTTON clickFunction={() => { handleDelete(element.id) }} title={'삭제하기🗑️'}></BUTTON>
              </div>
              <div className='modify'>
                {
                  isModify == element.id 
                  ?
                  <BUTTON clickFunction={()=> { handleIsModify(0)}} title={'수정완료✏️'}></BUTTON>
                  :
                  <BUTTON clickFunction={()=>{ handleIsModify(element.id) }} title={'수정하기✏️'}></BUTTON>
                }
              </div>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default App;

const BUTTON = ({clickFunction, title}) => {
  return (
    <button className='but' onClick={clickFunction}>{title}</button>
  )
}

const INPUT = ({class1, value1, changeFunction})=> {
  return (
    <input className={class1} value={value1} onChange={changeFunction} />
  )
}