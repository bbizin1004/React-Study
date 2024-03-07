import './App.css';
import { useState } from 'react';

function WriteForm(props) {
  return (
    /* submit 이벤트 리스너를 통해 폼값을 처리한다. */
    <form onSubmit={(e) => {
        console.log("이벤트객체e", e);
        //이벤트 객체를 통해 전송을 차단한다.
        e.preventDefault();
        //이벤트의 target속성을 통해 입력한 폼값을 얻어온다.
        let writer = e.target.writer.value;
        let title = e.target.title.value;
        let contents = e.target.contents.value;
        //부모 컴포넌트에서 props로 전달한 함수를 호출한다.
        props.writeAction(title, writer, contents);
      }}>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text' name="writer" /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name="title" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name='contents' cols='22' rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
      {/* input태그는 대표적인 싱글Tag로 종료태그를 보통은 쓰지 않는다.
      하지만 JSX에서는 반드시 시작, 종료 태그가 있어야 하므로 아래와 같이 
      2가지 방법으로 작성해야 한다. */}
      <input type='submit' value="전송" />
      {/* 두번째 방법
      <input type='submit' value="전송"></input>
       */}
    </form>
  );
}

function App() {
  //Hook을 통해 state를 생성한다.
  const[message,setMessage]= useState('폼값 검증 진행중');

  return (
    <div className='App'>
      <h2>React Form값 처리</h2>
      {/* 작성폼 컴포넌트를 추가하면서 props를 통해 폼값을 받아 콘솔에 출력하는 함수를
      전달한다. 3가지 폼값이 모두 빈값이 아니라면 state를 변경한다. */}
      <WriteForm writeAction={(wr,ti,con)=>{
        console.log("Form값",wr,ti,con);
        if(wr!==''&& ti!=='' && con!==''){
          //폼값 검증이 완료되면 state를 변경한다.
          setMessage('폼값 검증 완료')
        }
      }}></WriteForm>
      {/* state가 변경되면 새롭게 렌더링이 되므로 아래 글씨가 변경되는것을 볼 수 있다. */}
      <p>{message}</p>
    </div>
  );
}

export default App;
