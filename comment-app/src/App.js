import './App.css';
import {useState} from 'react';
import ComList from './commons/ComList';

function nowDateStr(){
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  const [mode, setMode] = useState('list');
  const [nextNo, setNextNo] = useState(4);
  const [no, setNo] = useState(null);

  
  return (
    <div className="App">
      <ComList myData={myData} 
        onDelete={(pno)=>{
          console.log("삭제no", pno, typeof(pno));
          let myDataCopy = [...myData];
          for(let i=0 ; i<myDataCopy.length ; i++){
            if(pno === myDataCopy[i].no){
              console.log("찾음");
              myDataCopy.splice(i, 1);
            }
          }
          setMyData(myDataCopy);
        }} 
        changeMode={(pmode, pno)=>{
          if(mode==='edit' && pmode==='edit'){
            alert('현재 수정mode 입니다. 수정취소를 먼저 눌러주세요.');
          }
          else{
            setMode(pmode);
            setNo(pno);
          }
        }}></ComList>
    </div>
  );
}

export default App;
