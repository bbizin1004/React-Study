import './App.css';


function MyBody(props) {
  const liTag1 = [], liTag2 = [];

  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i]);
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  let keyCnt = 0;
  for (let row of props.propData2) {
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }
  return (
    <ol>
      {/* 첫번째 경고창은 고정된 메세지를 알림창으로 띄워준다. props로 전달된
      기능을 자식 컴포넌트에서 그대로 사용하는 형식이다. 아래 링크를 클릭하는 경우
       알림창을 닫으면 화면이 새로고침 된다. */}
      <li><a href='/' onClick={()=>{props.onMyAlert1();}}>프론트앤드</a></li>
      <ul>
        {liTag1}
      </ul>
      {/* 이벤트 객체를 통해 화면이 새로고침 되지 않도록 요청을 중단시킨다 React는
       기본적으로 비동기방식으로 화면을 전환하므로 화면이 새로고침되면 안된다. 
       이럴 경우 초기화면으로 전환되기 때문이다. */}
      <li><a href='/' onClick={(event)=>{
        //이벤트를 중단시키는 이벤트 객체의 함수.
        event.preventDefault();
        props.onMyAlert2('백앤드');}

      }>백앤드</a></li>
      <ul>
        {liTag2}
        </ul>
    </ol>
  );
}

function App() {
  const myData1 = ['HTML5', 'CSS3', 'Javascript', 'jQuery'];
  const myData2 = ['Java', 'Oracle', 'JSP', 'Spring Boot'];

  return (
    <div className='App'>
      <h2>React - Event 처리</h2>
      {/* 이벤트 처리를 위해 특정 기능을 가진 함수를 props로 전달한다.
      Javascript의 함수형 프로그래밍에서 사용하는 일반적인 형태이다. */}
      <MyBody propData1={myData1} propData2={myData2}
      /** 화살표 함수를 통해 경고창을 띄우는 기능을 전달 */
        onMyAlert1={()=>{
          alert('알림창을 띄웁니다.')
        }}
        /** 익명함수를 통해 매개변수로 받은 메세지를 경고창으로 띄우는 
         기능을 전달 */
        onMyAlert2={function(msg){
          alert(msg);
        }}
      ></MyBody>
    </div>
  );
}

export default App;
