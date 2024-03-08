import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//모듈화
import TopNavi from './components/common/TopNavi'
import Home from './components/common/Home'
import NotFound from './components/common/NotFound'

import List from './components/board/List'
import View from './components/board/View'
import Write from './components/board/Write'

import Layout from './components/intro/Layout'
import IntroMas from './components/intro/IntroMas'
import IntroRouter from './components/intro/IntroRouter'
import LayoutIndex from './components/intro/LayoutIndex'







function App() {
  const topics = [
    { no: 1, title: '오늘은 React공부하는날', writer: '마스', contents: '리액트 좋아요' },
    { no: 2, title: '어제는 Javascript공부하는날', writer: '성현', contents: '자바스크립트 죽여요' },
    { no: 3, title: '내일은 Project공부하는날', writer: '크리스마스', contents: '프로젝트 힘들어요' },
  ];

  return (
    <BrowserRouter>
      <div className='App'>
        <TopNavi></TopNavi>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/list' element={<List topics={topics}></List>} />
          <Route path='/view'>
            <Route path=':no' element={<View topics={topics} />} />
          </Route>
          <Route path='/Write' element={<Write></Write>} />
          {/* 중첩된 라우터 구조에서 /intro 경로에서는 Layout 컴포넌트 내부에
          LayoutIndex 컴포넌트가 삽입된 상태로 렌더링 된다. 해당 컴포넌트는  Outlet이 
          삽입된 위치에서 렌더링 된다. */}
          <Route path='/intro' element={<Layout />}>
            <Route index element={<LayoutIndex />} />
            <Route path='mas' element={<IntroMas/>} />
            <Route path='router' element={<IntroRouter/>} />
          </Route>

          <Route path='/*' element={<NotFound></NotFound>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
