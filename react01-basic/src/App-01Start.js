import './App.css';

function App() {
  return (
    /** className 속성은 HTML에서 사용하는 class속성과 동일하다. JS에서
      이미 class라는 예약어가 있으므로 사용시 Waring이 발생된다.
     */
    <div className='App'>
      <h2>React - 기본</h2>
      <ol>
        <li>프론트앤드</li>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
        <li>백앤드</li>
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>Spring Boot</li>
        </ul>
      </ol>
    </div>
  );
}

export default App;
