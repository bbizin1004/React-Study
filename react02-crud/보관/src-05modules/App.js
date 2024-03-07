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
  const topics = [
    {no:1, title:'오늘은 React공부하는날',writer:'마스',date:'2024-03-05'},
    {no:2, title:'어제는 Javascript공부하는날',writer:'성현',date:'2024-03-05'},
    {no:3, title:'내일은 Project공부하는날',writer:'크리스마스',date:'2024-03-05'}
  ];

  const[mode,setMode] = useState('list');

  let articleComp,navComp,titleVar ;
  if(mode=== 'list'){
    titleVar = '게시판-목록(props)';
    navComp=<NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp= <ArticleList topics={topics} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:'+no);
      setMode('view');
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp=<NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    articleComp=<ArticleView></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp=<NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp=<ArticleWrite></ArticleWrite>
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
