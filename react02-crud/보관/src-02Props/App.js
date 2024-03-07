import './App.css';

//제목에 해당하는 컴포넌트
function Header(props) {
  //콘솔 확인용
  console.log('props', props.title);
  //props로 전달된 문자열을 <h2>에 삽입
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}
//각 화면을 전환하기 위한 네비게이션 컴포넌트
function Nav() {
  return (
    <nav>
      <a href='/'>글쓰기</a>
    </nav>
  );
}

//게시판의 주 내용이 출력되는 컴포넌트
function Article(props) {
  const lists = [];
  //props로 전달된 객체배열의 크기를 통해 루프
  for (let i = 0; i < props.topics.length; i++) {
    //해당 루프의 객체를 변수에 저장
    let row = props.topics[i];
    //빈 배열의 마지막 부분에 <tr>태그 삽입
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        <td>
          <a href={'/read/' + row.no}>{row.title}</a>
        </td>
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
          {/* push() 함수로 <tr>태그를 추가한 변수를 삽입 */}
          {lists}
        </tbody>
      </table>
    </article>
  )
}

function App() {
  //게시판의 데이터로 사용할 객체형 배열 생성
  const topics = [
    {no:1, title:'오늘은 React공부하는날',writer:'마스',date:'2024-03-05'},
    {no:2, title:'어제는 Javascript공부하는날',writer:'성현',date:'2024-03-05'},
    {no:3, title:'내일은 Project공부하는날',writer:'크리스마스',date:'2024-03-05'}
  ];
  return (
    <div className='App'>
      {/* 문자열 데이터를 props전달. 쿼테이션 사용 */}
      <Header title="게시판-목록(props)"></Header>
      <Nav></Nav>
      {/* 객체형 배열을 props로 전달. 브레이스 사용 */}
      <Article topics={topics}></Article>
    </div>
  );
}

export default App;
