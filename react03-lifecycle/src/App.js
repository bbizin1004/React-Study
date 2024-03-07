import './App.css';
import React,{useState,useEffect} from 'react';

/* 
useState: 컴포넌트 내부의 상태를 관리하기 위해 사용하는 state를
  생성 및 변경하기 위한 React Hook(훅)

useEffect: 함수형 컴포넌트에서 Lifecycle(생명주기)를 사용하기 위한 훅.
  컴포넌트 내부에서 발생하는 데이터 가져오기, 구독설정, 수동으로 DOM조작 등과 같은 작업을 수행한다. 컴포넌트가 렌더링된 후 실행할 코드를 정의할때 주로 사용한다.
  형식]
    import {useEffect} from 'react';
    function 컴포넌트명() {
      useEffect(()=>{
        컴포넌트가 렌더링 될때마다 실행될 코드;
        retrurn () => {
          컴포넌트가 언마운트되거나 다음 useEffect가 실행되기 전에
          실행될 코드;
        }
      },[의존성배열]);
    }

    의존성 배열 : 선택적으로 전달할 수 있는 배열. 이 배열에 포함된 값이
      변경될때만 useEffect함수가 실행된다. 만약 빈 배열을 전달하면
      컴포넌트가 마운트될때 한번만 실행되고, 의존성 배열을 생략하면
      매 렌더링마다 실행된다.



*/


function LifeGood(props){
  /* 이 컴포넌트에서 제일 먼저 실행되는 코드. 즉 렌더링 전에 실행할 코드가 있다면 
  이 부분에 작성하면 된다. */
  console.log('#Life','LifeGood==> 1.컴포넌트 실행');

  /* 2개의 state를 생성. state의 상태가 변할때마다 새롭게 렌더링된다.
  초기값은 props로 전달된 1로 설정된다. */
  var [myNumber,setMyNumber] = useState(props.initNumber);
  var [myDate,setMyDate] = useState((new Date()).toString());

  //컴포넌트가 렌더링 된 후 실행된다.
  useEffect(function(){
    //첫 실행에서는 마운트와 언마운트가 같이 실행되고 마지막에 마운트된다.
    console.log('#Life','useEffect 실행==> 3. 컴포넌트 마운트');
    return ()=>{
      //두번째 실행에서는 언마운트가 먼저 된 후 마운트 된다.
      console.log('#Life','useEffect 실행==>4. 컴포넌트 언마운트')
    }
  });

  //useEffect()가 먼저 선언되었지만 수명주기에서는 렌더링이 먼저 실행된다.
  console.log('#Life','return 실행==> 2.렌더링됨(render함수와 동일))');
  return (
    <div>
      <h4>함수형 컴포넌트의 수명주기 함수</h4>
      {/* state로 선언한 값을 출력한다. */}
      <p>Number: {myNumber}</p>
      <p>Date: {myDate}</p>

      {/* Math 객체를 통해 난수를 생성하여 state를 변경한다. */}
      <input type='button' value="난수" onClick={()=>{
        console.error('난수 버튼 누름');
        setMyNumber(Math.random());
      }}/>
      {/* Date객체를 통해 현재시각으로 state를 변경한다. */}
      <input type='button' value="날짜" onClick={()=>{
        console.error('날짜 버튼 누름');
        setMyDate((new Date()).toString());
      }}></input>
      {/* 위 2개의 버튼을 누를때마다 state가 변경되므로 새로운 렌더링이 계속 발생하게 된다. */}

    </div>
  );

}
function App(){
  return (
    <div className='App'>
      <h2>React- 라이프사이클</h2>
      {/* 숫자 1을 props로 전달한다. */}
      <LifeGood initNumber={1}></LifeGood>
    </div>
  )
}

export default App;
