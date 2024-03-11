import './App.css';
import React, { useState, useEffect } from 'react';

function ListTop(props) {
  var [myList, setMyList] = useState({ contacts: [] });

  useEffect(function () {
    //JSON 가져오기
    fetch('https://sample.bmaster.kro.kr/contacts?pageno=2')
      .then((result) => {
        console.log(result);
        return result.json();
      })
      .then((json) => {
        console.log(json);
        setMyList(json);
      });
    return () => {
      console.log('useEffect실행 ==>컴포넌트 언마운트');
    };
  }, []);

  let listTag = myList.contacts.map((data) => {
    return (
      <tr key={data.no}>
        <td>
          <img src={data.photo} alt='{data.no}' width='80px' />
        </td>
        <td>
          <a
            href={data.no}
            data-id={data.no}
            onClick={(e) => {
              e.preventDefault();
              props.myLinkClick(e.target.dataset.id);
            }}
          >
            {data.name}
          </a>
        </td>
      </tr>
    );
  });

  console.log('#Life', 'LifeGood==>2.return실행(render와 동일)');

  return (
    <>
      <div className='left'>
        <table border='1' width='300'>
          <thead>
            <tr>
              <th>photo</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>{listTag}</tbody>
        </table>
      </div>
    </>
  );
}

const ContactInfo = (props) => {
  //props로 전달된 JSON객체를 파싱해서 내용을 출력한다.
  return (
    <div id='contactView'>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>no:{props.myResult.no}</li>
        <li>name:{props.myResult.name}</li>
        <li>tel:{props.myResult.tel}</li>
        <li>address:{props.myResult.address}</li>
        <li>
          photo: <img src={props.myResult.photo} alt='{props.myResult.photo}' className='myImg' />{' '}
        </li>
      </ul>
    </div>
  );
};

function App() {
  //객체의 내용을 출력할 용도의 state(초기값은 빈 객체)
  var [myResult, setMyResult] = useState({});

  return (
    <div className='container'>
      <h2>연락처 API 연동하기</h2>
      <div className='row'>
        <div className='list col-sm-6'>
          <ListTop
            myLinkClick={(no) => {
              console.log('클릭', no);
              fetch('https://sample.bmaster.kro.kr/contacts/' + no)
                .then((result) => {
                  return result.json();
                })
                .then((json) => {
                  console.log('결과', json);
                  setMyResult(json);
                });
            }}
          ></ListTop>
        </div>
      </div>
      <div className='list col-sm-6'>
        <ContactInfo myResult={myResult}></ContactInfo>
      </div>
    </div>
  );
}

export default App;
