import { useState } from 'react';
import './App.css'
import { MOVIES } from './mocks/movie';

function App() {
  const [but, setBut] = useState(false);

  return (
    <>
      <img style={{ margin: '0 auto;'}} src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'></img>
      <div style={{ display: 'flex', gap: '15px', width: '100%', flexWrap: 'wrap', justifyContent: 'center'}}>
        {MOVIES.results.map((element, index) => {
          return (
            <div onMouseOver={()=>{setBut(index)}} style={{ position: 'relative' }}>
              <img key={index} src={`https://image.tmdb.org/t/p/w200${element.poster_path}`} width={'170px'} height={'200px'}></img>
              { but == index ? <div style={{ position: 'absolute', backgroundColor: 'black', opacity: '0.7', width: '170px', height: '200px', left: '0', top: '0'}}></div> : <></>}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App;