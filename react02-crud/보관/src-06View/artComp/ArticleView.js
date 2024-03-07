import React from "react";

//내용보기 컴포넌트
function ArticleView(props){
  console.log("선택한 게시물:", props.selectRow );
  //전달된 props를 통해 내용을 화면에 출력한다.
  return (
    <article>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <th>{props.selectRow.writer}</th>
          </tr>
          <tr>
            <th>제목</th>
            <th>{props.selectRow.title}</th>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{props.selectRow.date}</td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

export default ArticleView;