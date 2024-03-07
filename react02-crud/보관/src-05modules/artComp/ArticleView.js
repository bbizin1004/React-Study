import React from "react";

function ArticleView(props){
  return (
    <article>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <th>안성현</th>
          </tr>
          <tr>
            <th>제목</th>
            <th>오늘은 React공부하는날</th>
          </tr>
          <tr>
            <th>내용</th>
            <td>리액트 좋아요 <br/>
                리액트 유용해요<br/>
                리엑트 어려워요 ㅠ
              </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

export default ArticleView;