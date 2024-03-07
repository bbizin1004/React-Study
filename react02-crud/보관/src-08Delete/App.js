import './App.css';
import {useState} from 'react';

/* 각 컴포넌트를 해당 페이지에 임포트 한다. 컴포넌트 제작시 확장자는 js 혹은 jsx 둘다 가능하다. 각 경로에 맞게 컴포넌트명만 기술하면 된다. */
import NavList from './navComp/NavList';
import NavView from './navComp/NavView';
import NavWrite from './navComp/NavWrite';
import ArticleList from './artComp/ArticleList';
import ArticleView from './artComp/ArticleView';
import ArticleWrite from './artComp/ArticleWrite';


//임시 컴포넌트: 게시판과 상관없는 mode를 가질때 사용
/* <a>태그 */
function ReadyComp(){
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
  )
}



function App() {
  /* 글쓰기 처리를 위해 기존 배열 데이터를 state로 변경한다. 기존의 배열은 const로 선언하여 상수이므로 데이터를 변경할 수 없다. */
  const [topics, setTopics] = useState([
    {no:1, title:'오늘은 React공부하는날',writer:'마스',contents:'리액트 좋아요'},
    {no:2, title:'어제는 Javascript공부하는날',writer:'성현',contents:'자바스크립트 죽여요'},
    {no:3, title:'내일은 Project공부하는날',writer:'크리스마스',contents:'프로젝트 힘들어요'},
  ]);
  const [nextNo, setNextNo]= useState(4);
  const[mode,setMode] = useState('list');
  /* 게시물 조회를 위한 state. 게시판의 첫 진입은 목록이므로
  초기값은 null로 설정한다. */
  const[no, setNo]= useState(null);

  /*각 컴포넌트와 타이틀 저장을 위한 변수 생성. pops를 통해 화면 전환을 위한 함수를 
  자식 컴포넌트로 전달하고 있다. */
  /* 게시물 내용보기를 위한 변수 추가 . Java에서 DTO와 같이 게시물에 해당하는 하나의 객체를 저장한다.*/
  let articleComp,navComp,titleVar , selectRow ;
  if(mode=== 'list'){
    titleVar = '게시판-목록(props)';
    //글쓰기 링크
    navComp=<NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    //제목을 누르면 읽기로 이동
    articleComp= <ArticleList topics={topics} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:'+no);
      //화면전환을 위한 state를 view로 변경
      setMode('view');
      //선택한 게시물의 일련번호로 no를 변경
      setNo(no);
      //state에 변화가 생겼으므로 React는 화면을 새롭게 렌더링 한다.
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    //목록, 수정, 삭제 링크
    navComp=<NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>

    //선택한 게시물의 no를 통해 게시물을 얻어온다.
    console.log("현재no:"+ no,typeof(no));
    //게시물이 저장된 배열의 크기만큼 반복
    for(let i=0; i<topics.length; i++){
      //선택한 no와 일치하는 게시물이 있는지 검색
      if(no===topics[i].no){
        //no가 일치하면 객체를 변수에 저장한다.
        selectRow = topics[i];
      }
    }
    //조회된 게시물은 props를 통해 자식 컴포넌트로 전달한다.
    articleComp=<ArticleView selectRow={selectRow}></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp=<NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>

    /* 사용자가 입력한 내용을 새로운 개체로 생성한 후 추가하는 기능의 함수를 props를 통해 자식 컴포넌트로 전달한다. */
    articleComp=<ArticleWrite writeAction={(t,w,c)=>{
      //매개변수는 제목, 작성자, 내용으로 정의
      console.log("App.js",t,w,c);

      /* 사용자가 입력한 내용으로 새로운 객체를 생성한다.
      일련번호는 nextNo 라는 state를 활용한다. */
      let addTopics= {no:nextNo, title:t, writer:w, contents:c}

      /* 새롭게 만든 객체를 기존 배열인 topics에 추가한다. 그리고 기존객체를 통해 state를 변경한다. */
      //topics.push(addTopics);
      //console.log(topics)
      //setTopics(topics);


      /* 스프레드 연산자를 이용해서 기존 배열의 복사본을 생성한다.
      복사본 배열에 새로운 객체 하나를 추가한다. 객체가 추가된 배열을 통해 
      state를 변경한다. */
      let copyTopics = [...topics];
      copyTopics.push(addTopics);
      setTopics(copyTopics);

      /* 다음 글 추가를 위해 NO를 +1 처리한다. 즉 시퀀스를 수동으로 증가시켜 준다. */
      setNextNo(nextNo+1);

      //글 작성이 완료되면 목록으로 전환한다.
      setMode('list');
    }}></ArticleWrite>
  }
    else if(mode==='delete'){
      //삭제1
      //: 새로운 배열 변수를 하나 생성한다.
      //  let newTopics= [];
      // //원본 배열의 크기만큼 반복한다.
      // for(let i=0; i<topics.length; i++){
      //   //삭제할 게시물이 아닌 객체들만 새로운 배열에 추가한다.
      //   if(no !== topics[i].no){
      //     // 이렇게 하면 새로운 배열에는 삭제할 객체는 추가되지 않는 상태가 된다. 
      //     newTopics.push(topics[i]);
      //   }
      // }
      // setTopics(newTopics);

      //삭제2: splice()함수로 no가 일치하는 객체를 삭제한다.
      //원본 배열의 크기만큼 반복
      for(let i=0; i<topics.length; i++){
        //no가 일치하는 객체를 검색한다.
        if(no=== topics[i].no){
          //검색된 i번째 인덱스에서 하나의 객체를 삭제한다.
          topics.splice(i,1);
        }
      }
      //삭제된 배열을 통해 state를 변경한다.
      setTopics(topics);
      //삭제가 완료되면 목록으로 전환한다.
      setMode('list');
    }



  else{
    titleVar = '준비중입니다.'
    navComp=<ReadyComp></ReadyComp>
    articleComp='';
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
