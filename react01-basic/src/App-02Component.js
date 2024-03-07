import './App.css';

//컴포넌트 제작하기
/*
컴포넌트는 일반적인 자바스크립트 함수로 정의하면 된다. 
웹브라우저에 렌더링되어 출력되는 부분은 return문의 소괄호 안에 
JSX 문법으로 작성한다. 
초기버전에서는 클래스형 컴포넌트를 사용했지만, React Hook(훅)이 출시된
16.8버전 이후에는 함수형을 기본으로 사용하고 있다.
형식] 일반함수와 화살표함수 2가지를 사용할 수 있다.
    1. function 컴포넌트명() {
        return (
            출력할 UI를 JSX로 작성
        );
      }
    2. let 컴포넌트명 = () => {
      return(
        UI를 JSX로 작성
      );
    }
*/
function MyBody() {
  return (
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
  );
}

function App() {
  //한줄 주석
  /*블록 주석*/
  return (
    <div className='App'>
      <h2>React - 기본</h2>
      {/* 컴포넌트는 이와 같이 HTML태그 형태로 삽입한다. */}
      <MyBody></MyBody>
    </div>
  );
}

export default App;
