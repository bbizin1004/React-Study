import React from "react";
import { useLocation, useSearchParams } from 'react-router-dom';

const IntroRouter = () => {
  //URL에 대한 정보를 얻어오기 위한 변수 생성
  const location = useLocation();
  //쿼리스트링에 대한 정보를 얻어오기 위한 변수 및 setter 생성
  const [searchParams, setSearchParams] = useSearchParams();
  //쿼리스트링 중 필요한 파라미터명을 얻어온다.
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  //파라미터 중 detail에 대해 조작하는 함수
  const onToggleDetail = () => {
    //setter 함수를 통해 mode의 값을 true/false로 토글시킨다.
    setSearchParams({ mode, detail: detail === 'true' ? false : true });
  }; //삼항연산자를 사용하고 있다.


  //파라미터 중 mode를 1씩 증가시킨다.
  const onIncreaseMode = () => {
    /* mode가 null이거나 숫자가 아니라면 1로 설정하고, 존재하면 1을 더해준다. */
    const nextMode = mode === null || isNaN(mode) ? 1 : parseInt(mode) + 1;
    //앞에서 계산된 nextMode 값으로 설정한다.
    setSearchParams({ mode: nextMode, detail });
  };
  return (
    <>
      <h2>라우터 소개 페이지</h2>
      <div>
        <h4>useLocation 정보</h4>
        <ul>{/* useLocation()으로 얻어온 객체를 통해 정보를 출력 */}
          <li>URL 경로 : {location.pathname}</li>
          <li>쿼리스트링 : {location.search}</li>
        </ul>
        <h4>useSearchParams 정보</h4>
        <ul>
          {/* useSearchParams()를 통해 파라미터 정보 출력 */}
          <li>detail :{detail}</li>
          <li>mode :{mode}</li>
        </ul>
        {/* 버튼의 이벤트리스너에서는 정의된 함수를 호출 */}
        <button onClick={onToggleDetail}>Toggle detail</button>
        <button onClick={onIncreaseMode}>mode +++</button>
      </div>
    </>
  );
}

export default IntroRouter;