import React from 'react';
import { Link } from 'react-router-dom';

function List(props) {
  // const lists = [];
  // for (let i = 0; i < props.topics.length; i++) {
  //   let row = props.topics[i];
  //   lists.push(
  //     <tr key={row.no}>
  //       <td>{row.no}</td>
  //       <td>
  //         <Link to={'/view/' + row.no}>{row.title}</Link>
  //       </td>
  //       <td>{row.writer}</td>
  //     </tr>
  //   );
  // }


  /*퀴즈] 기존 for문으로 구현했던 부분을 map()함수를 이용해서 구현하시오.*/
  const lists= props.topics.map((row,idx)=> {
    return (
      <tr key={row.no}>
        <td>{row.no}</td>
        <td>
          <Link to={'/view/' + row.no}>{row.title}</Link>
        </td>
        <td>{row.writer}</td>
      </tr>
    );
  });

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

export default List;
