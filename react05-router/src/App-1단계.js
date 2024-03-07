import './App.css';

function List(props) {
  return (
    <>
      <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
        <a href='/write'>글쓰기</a>
      </nav>
      <article>
        <table border='1'>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <a href='/view'>오늘은 React공부하는날</a>
              </td>
              <td>마스</td>
              <td>2023-01-01</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <a href='/view'>오늘은 React공부하는날</a>
              </td>
              <td>크리스마스</td>
              <td>2023-01-01</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <a href='/view'>오늘은 React공부하는날</a>
              </td>
              <td>8월의 크리스마스</td>
              <td>2023-01-01</td>
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
        <a href='/list'>목록</a>
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
                  <textarea name='contents' cols={22} rows={3}></textarea>
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
  return (
    <>
      <header>
        <h2>게시판-읽기</h2>
      </header>
      <nav>
        <a href='/list'>목록</a>&nbsp;&nbsp;
        <a href='/edit'>수정</a>&nbsp;&nbsp;
        <a href='/delete'>삭제</a>
      </nav>
      <article>
        <table border='1'>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>안성현</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>오늘은 React공부하는날</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>react-router-dom부터 설치하세요.</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

function NotFound(){
return (
  <div>
    <h2>Not Found</h2>
    <p>
      페이지를 찾을 수 없습니다. <br/>
    </p>
  </div>
)

}


function App() {
  const topics = [

    { no: 1, title: '오늘은 React공부하는날', writer: '마스', contents: '리액트 좋아요' },
    { no: 2, title: '어제는 Javascript공부하는날', writer: '성현', contents: '자바스크립트 죽여요' },
    { no: 3, title: '내일은 Project공부하는날', writer: '크리스마스', contents: '프로젝트 힘들어요'},
  ]

  return <div className='App'>
    <List></List>
    <View></View>
    <Write></Write>
  </div>;
}

export default App;
