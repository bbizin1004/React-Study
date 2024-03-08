import React from "react";
import { useParams,Link } from 'react-router-dom';

function View(props) {
  var params = useParams();
  console.log(params.no);

  // const rows = props.topics;
  // let vi;
  //  for (let i = 0; i < rows.length; i++) {
  //    if (rows[i].no === Number(params.no)) {
  //      vi = rows[i];
  //    }
  //  }


    /*퀴즈] 기존에 for문으로 구현한 부분을 reduce()함수를 이용해서
    구현하시오. */
    let vi = props.topics.reduce((prev,curr)=>{
      if(curr.no===Number(params.no)){
        prev = curr;
      }
      return prev;
    },{});
 




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

export default View;