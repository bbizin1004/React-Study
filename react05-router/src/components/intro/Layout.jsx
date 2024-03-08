import React from "react";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* 컴포넌트에 style을 지정하는 경우 콧수염괄호를 이용해서 부여한다. */}
      <header style={{ background: 'lightgray', padding: '10px' }}>여긴 Header</header>
      <article>
        {/* 각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
        <Outlet />
      </article>
      <footer style={{ background: 'lightgray', padding: '10px' }}>여긴 Footer</footer>
    </div>
  );
};
export default Layout;