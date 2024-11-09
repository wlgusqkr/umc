import { createContext, useContext, useState } from 'react';
import './App.css'
const FirstContext = createContext();
const DarkContext = createContext()
function App() {

  const [TodoListArr, setTodoListArr] = useState([]);
  const [darkTheme, setDarkTheme] = useState();

  return (
    <>
      <h2 className='title' onClick={()=>{setDarkTheme({ color: 'white', backgroundColor: 'black', border: '1px solid gray' })}}>TodoList</h2>
      <DarkContext.Provider value={darkTheme}>
        <FirstContext.Provider value={{ TodoListArr, setTodoListArr}}>
          <SUBTITLE></SUBTITLE>
          <MAINCONTENTS></MAINCONTENTS>
        </FirstContext.Provider>
      </DarkContext.Provider>
    </>
  )
}

export default App;

const BUTTON = ({ clickFunction, title }) => {
  return (
    <button className='but' onClick={clickFunction} >{title} </button>
  )
}

const INPUT = ({ class1, value1, changeFunction }) => {
  return (
    <input className={class1} value={value1} onChange={changeFunction} />
  )
}

const SUBTITLE = () => {

  const { TodoListArr, setTodoListArr } = useContext(FirstContext)
  const theme = useContext(DarkContext);
  console.log(theme)
  const [count, setCount] = useState(1);
  const [inputText, setInputText] = useState();
  
  const autoIncreaseCount = () => {
    setCount(prev => prev + 1);
    return count;
  }

  const register = () => {
    setTodoListArr(prev => [...prev, { id: autoIncreaseCount(), text: inputText }])
  }

  const handleInputText = (e) => {
    setInputText(e.target.value);
  }
  return (
    <div className='sub-title' style={theme}>
      <h4>할일등록</h4>
      <div className='contents' style={theme}>
        <INPUT class1={'customInput'} style={theme} changeFunction={handleInputText}></INPUT>
        <div className='delete' >
          <button className='but' onClick={register} style={theme}>등록하기</button>
        </div>
      </div>
    </div>
  )
}

const MAINCONTENTS = () => {

  const { TodoListArr, setTodoListArr } = useContext(FirstContext)
  
  const [isModify, setIsModify] = useState(0);
  const handleDelete = (deleteId) => {
    let filteredList = TodoListArr.filter((element) => {
      return element.id != deleteId
    })
    setTodoListArr(filteredList);
  }

  const handleUpdate = (updateId, e) => {

    let newList, filteredListIndex;


    filteredListIndex = TodoListArr.findIndex((element) => {
      if (element.id == updateId) {
        return true;
      }
    })
    newList = TodoListArr.with(filteredListIndex, { id: updateId, text: e.target.value })
    setTodoListArr(newList);
  }

  const handleIsModify = (index) => {
    if (index == 0) {
      setIsModify(0);
    } else {
      setIsModify(index);
    }
  }

  return (
    <div className='main-box' >
    {TodoListArr.map((element, index) => {
      return (
        <div className='contents' key={index}>
          <div className='text'>
            {isModify == element.id
              ? <INPUT class1='modifyInput' value1={element.text} changeFunction={(e) => { handleUpdate(element.id, e) }} />
              : <p>{element.text}</p>}
          </div>
          <div className='delete'>
            <BUTTON clickFunction={() => { handleDelete(element.id) }} title={'삭제하기🗑️'}></BUTTON>
          </div>
          <div className='modify'>
            {
              isModify == element.id
                ?
                <BUTTON clickFunction={() => { handleIsModify(0) }} title={'수정완료✏️'}></BUTTON>
                :
                <BUTTON clickFunction={() => { handleIsModify(element.id) }} title={'수정하기✏️'}></BUTTON>
            }
          </div>
        </div>
      )
    })}
  </div>
  )
}