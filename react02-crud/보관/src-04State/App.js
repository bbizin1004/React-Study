import './App.css';
//state 관리용 훅 임포트
import {useState} from 'react';

//임시 컴포넌트: 게시판과 상관없는 mode를 가질때 사용
/* <a>태그에 별도의 이벤트 처리를 하지 않았으므로 클릭시 화면이 새로고침되어
리스트 화면으로 전환된다. */
function ReadyComp(){
  return (
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home 바로가기</a>
    </div>
  );
}




function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}
//게시판 목록에서 사용하는 네비게이션 컴포넌트
function NavList(props) {
  return (
    <nav>
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}

//내용보기의 네비게이션
function NavView(props) {
  /* 각 버튼 사이에 스페이스(공백)를 주고 싶다면 &nbsp; 혹은 {" "}와 같이 작성하면 된다.
  각 링크는 mode의 값을 변경하는 이벤트 처리가 되어 있다. */
  return (
    <nav>
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>{" "}
    </nav>
  );
}

//작성하기으 네비게이션
function NavWrite(props) {
  return (
    <nav>
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
}





//게시판 목록
function ArticleList(props) {
  const lists = [];
  for (let i = 0; i < props.topics.length; i++) {
    let row = props.topics[i];
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode(row.no);
          }}>{row.title}</a></td>
        <td>{row.writer}</td>
        <td>{row.date}</td>
      </tr>
    );
  }
  return (
    <article>
      <table border='1'>
        <thead>
          <tr>
            <th>NO</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  );
}

//게시판으 내용보기
function ArticleView(props){
  return (
    <article>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <th>안성현</th>
          </tr>
          <tr>
            <th>제목</th>
            <th>오늘은 React공부하는날</th>
          </tr>
          <tr>
            <th>내용</th>
            <td>리액트 좋아요 <br/>
                리액트 유용해요<br/>
                리엑트 어려워요 ㅠ
              </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

//게시판으 작성하기
function ArticleWrite(props){
  return (
    <article>
      <table border={1}>
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text'></input></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text'></input></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea cols='22' rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}



function App() {
  //게시물 목록을 위한 변수
  const topics = [
    {no:1, title:'오늘은 React공부하는날',writer:'마스',date:'2024-03-05'},
    {no:2, title:'어제는 Javascript공부하는날',writer:'성현',date:'2024-03-05'},
    {no:3, title:'내일은 Project공부하는날',writer:'크리스마스',date:'2024-03-05'}
  ];

  /* 화면 전환을 위한 state 생성. 이름은 mode, 초기값은 list, setter 함수는 setMode()로 설정 */
  const[mode,setMode] = useState('list');

  /* 각 컴포넌트와 타이틀 저장을 위한 변수 생성. props를 통해 화면 전환을 위한 함수를 자식
  컴포넌트로 전달한다. */
  let articleComp,navComp,titleVar ;
  if(mode=== 'list'){
    titleVar = '게시판-목록(props)';
    //"쓰기" 링크
    navComp=<NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    /* 게시물의 "제목" 클릭시 이벤트 처리 */
    articleComp= <ArticleList topics={topics} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:'+no);
      setMode('view');
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    /* 목록, 수정, 삭제 링크 */
    navComp=<NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    articleComp=<ArticleView></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    //'목록' 링크
    navComp=<NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp=<ArticleWrite></ArticleWrite>
  }
  else{
    /* 수정, 삭제는 아직 작업전이므로 '준비중' 컴포넌트를 렌더링한다. */
    navComp=<ReadyComp></ReadyComp>
    //주요내용이 출력되는 컴포넌트는 빈값으로 처리한다.
    articleComp='';
  }


  return (
    <div className='App'>
      {/* 헤더의 경우 제목만 변경되고 UI는 동일하므로 하나의 컴포넌트를 공유해서 사용한다. */}
      <Header title={titleVar}></Header>
      {/* Nav와 Article은 UI 자체가 다르므로 각각의 컴포넌트를 조건에 따라 변경해서 사용해야 한다. */}
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;
