import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation, useSearchParams } from 'react-router-dom';

const TopNavi = () => {
  return (
    <nav>
      <NavLink to='/'>HOME</NavLink>&nbsp;
      <NavLink to='/list'>게시판</NavLink>&nbsp;
      <NavLink to='/intro'>인트로</NavLink>&nbsp;
      <NavLink to='/intro/mas'>마스프로필</NavLink>&nbsp;
      <NavLink to='/intro/router'>Router 소개</NavLink>&nbsp;
      <NavLink to='/xyz'>잘못된URL</NavLink>&nbsp;
    </nav>
  );
};

const Home = () => {
  return (
    <>
      <h2>React Router Home</h2>
      <p>홈 화면입니다.</p>
    </>
  );
};

function List(props) {
  const lists = [];

  for (let i = 0; i < props.topics.length; i++) {
    let row = props.topics[i];
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        <td>
          <Link to={'/view/' + row.no}>{row.title}</Link>
        </td>
        <td>{row.writer}</td>
      </tr>
    );
  }

  return (
    <>
      <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
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
          <tbody>{lists}</tbody>
        </table>
      </article>
    </>
  );
}

const Layout = () => {
  return (
    <div>
      <header style={{ background: 'lightgray', padding: '10px' }}>여긴 Header</header>
      <article>
        {/* 각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
        <Outlet />
      </article>
      <footer style={{ background: 'lightgray', padding: '10px' }}>여긴 Footer</footer>
    </div>
  );
};

const LayoutIndex = () => {
  return <h2>인트로 인덱스 페이지</h2>;
};

const IntroMas = () => {
  return <h2>마스 소개 페이지</h2>;
};

const IntroRouter = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  const onToggleDetail = () => {
    setSearchParams({ mode, detail: detail === 'true' ? false : true });
  };
  const onIncreaseMode = () => {
    const nextMode = mode === null || isNaN(mode) ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode: nextMode, detail });
  };
  return (
    <>
      <h2>라우터 소개 페이지</h2>
      <div>
        <h4>useLocation 정보</h4>
        <ul>
          <li>URL 경로 : {location.pathname}</li>
          <li>쿼리스트링 : {location.search}</li>
        </ul>
        <h4>useSearchParams 정보</h4>
        <ul>
          <li>detail :{detail}</li>
          <li>mode :{mode}</li>
        </ul>
        <button onClick={onToggleDetail}>Toggle detail</button>
        <button onClick={onIncreaseMode}>mode +++</button>
      </div>
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
  var params = useParams();
  console.log(params.no);

  const rows = props.topics;
  let vi;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].no === Number(params.no)) {
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
