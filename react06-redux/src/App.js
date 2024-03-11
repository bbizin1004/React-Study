import './App.css';
/* 리덕스 스토어를 생성하기 위한 패키지 임포트 */
import { legacy_createStore as createStore } from 'redux';
/*리덕스를 적용할 컴포넌트를 감싸주는 프로바이더와 리덕스 관련 Hook을
 위한 패키지 임포트 */
import { Provider, useSelector,useDispatch } from 'react-redux';

/* 
Redux(리덕스)란..??
  :React로 제작한 애플리케이션의 상태관리를 위한 라이브러리로
  React와 함꼐 사용되지만 써드파티로 제공되므로 별도로 설치해야 한다.

Provider
  :어떤 컴포넌트에 스테이트를 제공할지를 결정하는 랩퍼 컴포넌트로,
  우리는 App컴포넌트 하위의 <Left1>,<Right1>을 감싸준다.그러면
  하위 컴포넌트에서 Store를 사용할 수 있게 된다.

useSelector
  :스테이트 값을 선택할 때 사용되는 Hook

useDispatch
  :스테이트 값을 변경할 때 리듀서(Reducer) 함수를 호출하는 역활의 HOOK
*/

/* 
스토어 생성시 주입할 리듀서(Reducer)를 먼저 생성한다.
리듀서는 스토어에 있는 스테이트를 변경하기 위한 코드를 실행부로 
정의하면 된다.
파라미터는 2개가 필요하다.
  currentState: 현재의 state값
  action : state변경에 필요한 요청 파라미터. 2개 이상의 값을 전달할 수 있어야 하므로  JSON객체를 주로 사용한다.
*/
function reducer(currentState, action) {
  /* 만약 state가 정의되지 않았다면 number를 1로 설정한다.
  기존에는 App컴포넌트에서 useState 훅을 통해 생성했지만, Redux가 
  도입되면 Store에서 state를 생성한 후 관리한다. */
  if (currentState === undefined) {
    //JSON 객체로 생성한다.
    return {
      number: 1,
    };
  }
  //현재의 state의 복사본을 스프레드 연산자를 이용해서 생성한다.
  const newState = { ...currentState };

  //요청(Action)을 분석한 후 상태(state)를 변경한다.
  if (action.type === 'PLUS') {
    newState.number++;
  }

  //변경된 state를 반환한다.
  return newState;
}
//앞에서 생성한 Reducer(리듀서)를 인수로 Store(스토어)를 생성한다.
const store = createStore(reducer);


/* 스토어가 도입되었으므로 Right1,Right2는 props를 통해 함수를 전달하지
않아도 된다. 모든 state는 스토어가 관리한다. */
const Right1 = () => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2></Right2>
    </div>
  );
};

const Right2 = () => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3></Right3>
    </div>
  );
};

const Right3 = () => {
  /* 디스패치를 Hook을 통해 얻어온다. 여기서는 type을 PLUS로
  설정하여 스토어에 정의된 리듀서 함수를 호출한다. JSON 객체 형태로
  만들면 되고, 이를 Action이라고 한다. */
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Right3</h2>
      <input
        type='button'
        value='+'
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      ></input>
    </div>
  );
};
const Left1 = () => {
  return (
    <div>
      <h2>Left1</h2>
      <Left2></Left2>
    </div>
  );
};
const Left2 = () => {
  return (
    <div>
      <h2>Left2</h2>
      <Left3></Left3>
    </div>
  );
};
const Left3 = () => {
  /* Store에 정의된 여러 state중 어떤것을 받을지를 정의한 함수 f를
  useSelector 훅으로 전달한다. */
  // function f(state){
  //   return state.number;
  // }
  // const number = useSelector(f);

  /* 위의 정의를 아래와 같이 변경할 수 있다. 화살표 함수로 변경한 후 
  인수로 사용한다. 즉 여려개의 state중 이 컴포넌트에서 필요한 값을 
  선택해야 하므로 간단한 커스텀 함수가 필요한 것이다. */
  const number = useSelector((state) => {
    return state.number;
  });
  return (
    <div>
      <h2>Left3:{number}</h2>
    </div>
  );
};

function App() {

  //스토어가 있으므로 App에서 state를 관리하지 않는다.
  // const [number, setNumber] = useState(1);

  return (
    <div className='root'>
      <h2>React-Redux</h2>
      <div id='grid'>
        {{/* 하위 컴포넌트를 Wrapping(감싸기) 하면 스토어를 
          사용할 수 있게 된다. 이때 앞에서 생성한 store를 props로 
          사용해야 한다. */}}
        <Provider store={store}>
          {/* App이 state를 관리하지 않으므로 렌더링시 props를 통해
           전달할 필요가 없어진다. 그냥 store에서 가져다가 사용하면 된다. */}
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

export default App;
