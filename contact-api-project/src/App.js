import './App.css';
import {React,useState,useEffect}  from 'react';

function Contacts(props) {

  var [myJSON, setmyJSON] = useState({ contacts:[]})

  useEffect(function(){
    fetch('https://sample.bmaster.kro.kr/contacts?pageno=2')
    .then((result)=>{
      return result.json();
    }).then((json)=>{
      setmyJSON(json);
    });
    return () =>{};
  },[]);


  let cTag = myJSON.result.map((data)=>{
    <tr key={data.contacts.no}>
      <td></td>



    </tr>
  })
  

  return (
    <>
      <h2>연락처 API 연동하기</h2>
      <div class='left'>
        <table border='1'>
          <thead>
            <tr>
              <th>photo</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class='right'>
        <p>no:</p>
        <p>name:</p>
        <p>tel:</p>
        <p>address:</p>
        <p>photo:</p>
      </div>
    </>
  );
}

function App() {
  return (
    <div className='App'>
      <Contacts></Contacts>
    </div>
  );
}

export default App;
