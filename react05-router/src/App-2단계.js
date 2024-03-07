import './App.css';
/* React의 라우터 처리는 가장 먼저 BrowserRouter 컴포넌트로 최상위 App컴포넌트를 감싸야한다. 이 처리는 index.js 혹은 App.js에서 할수있다. */
import {BrowserRouter} from 'react-router-dom'
/* 라우터 처리에 필요한 컴포넌트와 Hook을 임포트한다. */
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';


/*
라우팅이란?
  :사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 기능을 말한다.
  우리가 Web에서 흔히 "페이지이동"이라고 하는것을 React에서는
  'Router(라우터)'를 통해 구현할 수 있다.
*/

/*
NavLink 컴포넌트
:일반적인 링크는 <a>태그를 사용하지만, React에서는 화면의 새로고침이
되면 안되므로 이벤트객체를 통해 preventDefault()함수를 사용해야 한다.
<a>태그의 단점을 보완할 수 있는 컴포넌트로 화면의 깜박임 없이 화면을
이동할 수 있는 기능을 제공한다. 또한 링크를 클릭했을때 active라는 
class속성을 자동으로 부여해준다.
*/
const TopNavi=()=> {
  return (
    <nav>
      <NavLink to='/list'>목록보기</NavLink>
      <NavLink to='/view'>내용보기</NavLink>
      <NavLink to='/write'>작성하기</NavLink>
    </nav>
  );
}

/*
Link 컴포넌트
:NavLink와 동일한 기능을 제공한다. 단 클릭했을때 active 클래스를 자동으로 
부여해주는 기능이 없다.
*/
function List(props) {
  return (
    <>
      <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
        {/* <a href='/write'>글쓰기</a> */}
        <Link to='/write'>글쓰기</Link>
      </nav>
      <article>
        <table border='1'>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                {/* <a href='/view'>오늘은 React공부하는날</a> */}
                <Link to='/view/1'>오늘은 React공부하는날</Link>
              </td>
              <td>마스</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Link to='/view/2'>오늘은 React공부하는날</Link>
              </td>
              <td>크리스마스</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <Link to='/view/3'>오늘은 React공부하는날</Link>
              </td>
              <td>8월의 크리스마스</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

function Write(props) {
  return (
    <>
      <header>
        <h2>게시판-작성</h2>
      </header>
      <nav>
        <Link to='/list'>목록</Link>
      </nav>
      <article>
        <form>
          <table border='1'>
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input type='text' name='writer' />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type='text' name='title' />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea name='contents' cols='22' rows='3'></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type='submit' value='쓰기'></input>
        </form>
      </article>
    </>
  );
}

function View(props) {
  
  /*
  useParams훅
  : 라우터 처리를 통해 전달되는 파라미터를 얻어올 때 사용하는 훅이다.
  내용보기의 링크는 'path='/view/:no' 와 같이 되어있는데, 뒷부분의
  :no 부분을 useParams를 통해 얻어올 수 있다.
  */

  var params = useParams();
  console.log(params.no);

  //props로 전달된 데이터배열을 얻어온다.
  const rows = props.topics;
  let vi;
  //크기만큼 반복한다.
  for(let i = 0; i < rows.length; i++) {
    /* 파라미터로 전달된 값은 문자형식이므로 Number()를 통해 
    숫자형식으로 변환 후 비교한다. ===는 변수의 값과 타입까지 비교하는
    비교연산자 입니다. */
    if (rows[i].no === Number(params.no)) {
      //no가 일치하는 객체를 저장한다.
      vi = rows[i];
    }
  }

  return (
    <>
      <header>
        <h2>게시판-읽기</h2>
      </header>
      <nav>
        <Link to='/list'>목록</Link>&nbsp;&nbsp;
        <Link to='/edit'>수정</Link>&nbsp;&nbsp;
        <Link to='/delete'>삭제</Link>
      </nav>
      <article>
        <table border='1'>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{vi.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{vi.title}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{vi.contents}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}


//라우팅 처리된것 이외의 URL로 요청이 들어오면 렌더링
const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
        <Link to='/'>Home</Link>
      </p>
    </div>
  );
};

function App() {
  const topics = [
    { no: 1, title: '오늘은 React공부하는날', writer: '마스', contents: '리액트 좋아요' },
    { no: 2, title: '어제는 Javascript공부하는날', writer: '성현', contents: '자바스크립트 죽여요' },
    { no: 3, title: '내일은 Project공부하는날', writer: '크리스마스', contents: '프로젝트 힘들어요' },
  ];

  /*
  Route 컴포넌트
  : 요청URL에 따라 개별 컴포넌트를 렌더링하는 기능을 가지고 있어
  실질적인 라우팅 처리를 위해 사용된다.
    -path : 요청명을 설정한다.
    -element : 해당 요청에 렌더링할 컴포넌트를 지정한다.
  */

  return (
    <div className='App'>
      <TopNavi></TopNavi>
      <Routes>
      <Route path ='/' element={<List></List>} />
      <Route path ='/list' element={<List topics={topics}></List>} />

       {/* 하나의 Route로 구성된것을 아래와 같이 2Depth로 처리할 수 있다.
       이것을 '중첩라우팅'이라고 한다. 
       하나의 Route로 구성하는 경우 /view로 요청이 들어오면 패턴을 찾지못해 Not found가 된다. 하지만 중첩구졸 만들어 놓으면 이 경우에도 페이지는 정상적으로 표시된다.
       */}
      {/* <Route path ='/view/:no' element={<View topics={topics}></View>} /> */}
      <Route path='/view'>
        <Route path=':no' element={<View topics={topics} />} />
      </Route>
      <Route path ='/Write' element={<Write></Write>} />

      {/* 위에서 지정한 URL패턴이 아닌 경우에 렌더링 된다. */}
      <Route path ='/*' element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
