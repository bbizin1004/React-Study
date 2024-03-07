import './App.css';
import React, { useState, useEffect } from 'react';


//목록을 출력하는 컴포넌트
const GlobalTop = (props) => {
  //컴포넌트가 마운트될때 제일 먼저 실행되는 코드
  console.log('#Life', 'GlobalTop==> 1.컴포넌트실행');
  //state 생성. myList의 초기값은 빈 배열로 설정.
  var [myList, setMyList] = useState([]);

  //return문이 실행된 후, 즉 렌더링이 완료된 후 실행되는 함수
  useEffect(function () {
    console.log('#Life', 'LifeGood==> 3.useEffect실행1');

    /* 이 컴포넌트가 렌더링된 후 json파일을 요청한다. 콜백데이터를 JSON으로 변환 후 
    state를 변경한다. */
    fetch('./json/myData.json')
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json);
        setMyList(json);
      });
    return () => {
      console.log('#Life', 'LifeGood==>4.useEffect실행2');
    };
  }, []);
  /* 
  의존성 배열로 빈배열을 추가해놓은 상태
  */


  //빈 배열 변수 생성
  var listTag = [];
  //state로 선언된 변수의 크기만큼 반복
  for (var i = 0; i < myList.length; i++) {
    var data = myList[i];
    console.log('데이터', data.id, data.num);
    //각 항목을 빈 배열에 순서대로 추가한다.
    listTag.push(
      /* <li>태그와 같이 반복되는 요소에는 중복되지 않는 key prop를
      지정하는 것이 좋다. 그렇지 않다면 Warning이 발생된다. */
      <li key={data.id}>
        {/* data-id 속성에 설정된 값은 이벤트 객체의 target속성 하위의
        dataset.id를 통해 얻어올수 있다. 여기서는 게시물의 일련번호인 num값을 설정하고 있다. */}
        <a href={data.id} data-id={data.num} onClick={(e) => {
            e.preventDefault();
            console.log("이벤트객체",e);
            /* props로 전달된 함수를 호출한다. 이때 해당 게시물의 num값을 아래와 같이 인수로 전달한다. */
            props.myLinkClick(e.target.dataset.id);
          }}>
          {data.id}
        </a>
      </li>
    );
  }
  //여기서 UI를 렌더링
  console.log('#Life', 'LifeGood==>2.return실행(render와 동일)');
  return (
    <nav>
      <ul>{listTag}</ul>
    </nav>
  );
};

//props로 전달된 객체의 값을 화면에 출력
const ContentBody = (props) => {
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num :{props.myResult.num}</li>
        <li>id :{props.myResult.id}</li>
        <li>cell :{props.myResult.cell}</li>
        <li>description :{props.myResult.description}</li>
      </ul>
    </div>
  );
};

//최상위 컴포넌트
function App() {
  //state 생성. myResult의 초기값은 빈 객체로 설정
  var [myResult, setMyResult] = useState({});

  return (
    <div className='App'>
      <h2>React- 내부서버통신</h2>
      {/* 클릭시 내부에 저장된 dto.json 파일을 요청하고 콜백 결과를 받을수 있는 기능의
      함수를 props로 전달 */}
      <GlobalTop myLinkClick={(num) => {
          console.log('클릭', num);
          //num에 해당하는 dto파일을 요청
          fetch('./json/dto'+ num + '.json')
            .then((result) => {
              /* 요청에 성공하면 첫번째 then절로 콜백데이터를 반환한다.
              콜백데이터는 Text형식으로 고정된다. */
              console.log('결과1',result);
              /* json형식으로 변환 후 리턴한다. 여기서 반환되는 값은 두번째 then 절로 전달된다.*/
              return result.json();
            })
            .then((json) => {
              console.log('결과2',json);
              /* 전달받은 값으로 state를 변환한다. 초기값은 빈객체로 설정되어 있고, dto.json을 통해
              콜백받은 값도 객체이다. */
              setMyResult(json);
            });
        }}
      ></GlobalTop>
      {/* 상세내용을 출력하는 컴포넌트로 초기값은 빈 객체이므로 아무런 내용도 출력되지 않는다.
      통신이 끝난 이후에는 해당 내용이 출력된다. */}
      <ContentBody myResult={myResult}></ContentBody>
    </div>
  );
}

export default App;
