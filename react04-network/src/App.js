import './App.css';
import React, { useState, useEffect } from 'react';



function MyCommunucation(props) {
  /* 외부 서버의 api를 얻어오기 위해 state 생성. 초기값은 JSON의
  포맷에 따라 달라질 수 있으므로 확인 후 설정해야 한다. */
  var [myJSON, setmyJSON] = useState({ results: [] });

  //렌더링 후 실행을 위한 함수 선언
  useEffect(function () {
    //외부서버로 요청한 후 받은 콜백데이터를 JSON으로 변환 후 state에 적용
    fetch('https://api.randomuser.me?results=10')
      .then((resuslt) => {
        console.log(resuslt);
        return resuslt.json();
      })
      .then((json) => {
        console.log(json);
        setmyJSON(json);
      });
    return () => {
      console.log('#Life', 'useEffect실행 ==> 컴포넌트 언마운트');
    };
  }, []);
  /* useEffect() 의 두번째 인자인 의존성 배열에 빈 배열을 지정. 만약
  지정하지 않으면 렌더링마다 실행되므로 화면이 계속 새로고침되는 현상이 발생된다. */


  //콜백받은 JSON데이터를 파싱하여 <tr>테그로 구성한다.
  let trTag = [];
  for (let i = 0; i < myJSON.results.length; i++) {
    //현재 루프에서의 객체 하나를 가져온다.
    let data = myJSON.results[i];
    console.log(data);
    //썸네일 이미지와 기타 데이터를 파싱해서 <tr>를 구성한다.
    trTag.push(
      <tr key={data.login.md5}>
        <td>
          <img src={data.picture.thumbnail} alt='{data.login.username}' />
        </td>
        <td>
          {/* 아이디를 클릭하면 props로 전달된 함수를 호출한다. 현재 루프의
          객체를 그대로 인수로 전달한다. */}
          <a href='/' onClick={(e) => {
              e.preventDefault();
              props.onProfile(data);
            }}
          >
            {data.login.username}
          </a>
        </td>
        <td>
          {data.name.title} {data.name.first} {data.name.last}{' '}
        </td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  }
  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
      </table>
    </div>
  );
}

//최상위 컴포넌트
function App() {
  return (
    <div className='App'>
      <h2>React- 외부서버통신</h2>
      {/* 링크를 클릭하면 정보를 파싱한 문자열을 alert()로 출력한다. */}
      <MyCommunucation onProfile={(sData)=>{
        console.log(sData);
        let info = `전화번호:${sData.cell}
        성별:${sData.gender}
        username:${sData.login.username}
        password:${sData.login.password}`;
        alert(info);

      }}></MyCommunucation>
    </div>
  );
}

export default App;
