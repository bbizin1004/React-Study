import './App.css';
import { useState } from 'react';

/* 각 컴포넌트를 해당 페이지에 임포트 한다. 컴포넌트 제작시 확장자는 js 혹은 jsx 둘다 가능하다. 각 경로에 맞게 컴포넌트명만 기술하면 된다. */
import NavList from './navComp/NavList';
import NavView from './navComp/NavView';
import NavWrite from './navComp/NavWrite';
import ArticleList from './artComp/ArticleList';
import ArticleView from './artComp/ArticleView';
import ArticleWrite from './artComp/ArticleWrite';
import NavEdit from './navComp/NavEdit';
import ArticleEdit from './artComp/ArticleEdit';

//임시 컴포넌트: 게시판과 상관없는 mode를 가질때 사용
/* <a>태그 */
function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home 바로가기</a>
    </div>
  );
}

//제목 컴포넌트
function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

function App() {
  const [topics, setTopics] = useState([
    { no: 1, title: '오늘은 React공부하는날', writer: '마스', contents: '리액트 좋아요', date: '2024-03-04' },
    { no: 2, title: '어제는 Javascript공부하는날', writer: '성현', contents: '자바스크립트 죽여요',
    date: '2024-03-05' },
    { no: 3, title: '내일은 Project공부하는날', writer: '크리스마스', contents: '프로젝트 힘들어요',date: '2024-03-06' },
  ]);
  const [nextNo, setNextNo] = useState(4);
  const [mode, setMode] = useState('list');
  const [no, setNo] = useState(null);

  let articleComp, navComp, titleVar, selectRow;
  if (mode === 'list') {
    titleVar = '게시판-목록(props)';
    navComp = (
      <NavList
        onChangeMode={() => {
          setMode('write');
        }}
      ></NavList>
    );
    articleComp = (
      <ArticleList
        topics={topics}
        onChangeMode={(no) => {
          console.log('선택한 게시물 번호:' + no);
          setMode('view');
          setNo(no);
        }}
      ></ArticleList>
    );
  } else if (mode === 'view') {
    titleVar = '게시판-읽기(props)';
    navComp = (
      <NavView
        onChangeMode={(pmode) => {
          setMode(pmode);
        }}
      ></NavView>
    );

    console.log('현재no:' + no, typeof no);
    for (let i = 0; i < topics.length; i++) {
      if (no === topics[i].no) {
        selectRow = topics[i];
      }
    }
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>;
  } else if (mode === 'write') {
    titleVar = '게시판-쓰기(props)';
    navComp = (
      <NavWrite
        onChangeMode={() => {
          setMode('list');
        }}
      ></NavWrite>
    );

    articleComp = (
      <ArticleWrite
        writeAction={(t, w, c) => {
          console.log('App.js', t, w, c);

          //현재 날짜를 가져온다. 0000-00-00 포맷으로 문자열을 생성한다.
          let dateObj = new Date();
          var year = dateObj.getFullYear();
          var month = ("0"+ (1+ dateObj.getMonth())).slice(-2);
          var day = ("0"+ dateObj.getDate()).slice(-2);
          let nowDate = year + "-"+ month+ "-" + day;

          let addTopics = {no:nextNo, title:t, writer:w, contents:c , date:nowDate};

          let copyTopics = [...topics];
          copyTopics.push(addTopics);
          setTopics(copyTopics);

          setNextNo(nextNo + 1);

          setMode('list');
        }}
      ></ArticleWrite>
    );

  } else if (mode === 'delete') {
    for (let i = 0; i < topics.length; i++) {
      if (no === topics[i].no) {
        topics.splice(i, 1);
      }
    }
    setTopics(topics);
    setMode('list');

  } else if(mode==='edit'){
    titleVar = '게시판-수정(props)';

    //수정페이지의 네비게이션 : 뒤로, 목록 링크가 있다.
    navComp = <NavEdit 
      //목록으로 이동하는 링크
      onChangeMode={()=>{setMode('list');
    }} 
    /* 수정은 보기에서 들어가므로 '뒤로' 링크를 누르면 내용보기 페이지로 이동하면 된다. */
    onBack={()=>{
      //alert('읽기 페이지로 가야함);
      setMode('view');
      setNo(no);
    }}></NavEdit>
    //현재 수정하려는 게시물을 배열에서 찾기 위해 no와 비교한다.
    for(let i=0; i<topics.length; i++ ) {
      if(no===topics[i].no){
        selectRow = topics[i];
      }
    }

    /*수정은 기존에 입력한 내용을 작성폼에 세팅하는것이 먼저 처리되어야 하므로 props로 전달한다. */
    articleComp = <ArticleEdit selectRow={selectRow}
        //수정처리
        editAction={(t,w,c)=>{
          /* 사용자가 수정한 값으로 새로운 객체를 생성한다. */
          let editTopics= {no:no , title:t,writer:w, contents:c};
          console.log('수정내용',editTopics);

          //스프레드 연산자를 통해 데이터 배열의 복사본을 만든다.
          let copyTopics = [...topics];
          //복사본의 크기만큼 반복한다.
          for(let i = 0; i<copyTopics.length; i++){
            //현재 수정하려는 객체를 찾는다.
            if(copyTopics[i].no===no){
              //수정할 객체로 변경한다.
              copyTopics[i]=editTopics;
              //수정이 완료되면 즉시 루프를 탈출한다.
              break;
            }
          }
          //복사본을 통해 state를 변경한다.
          setTopics(copyTopics);
          //내용보기 화면으로 전환한다.
          setMode('view');

        }}></ArticleEdit>
  }
  
  else {
    titleVar = '준비중입니다.';
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }

  return (
    <div className='App'>
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;
