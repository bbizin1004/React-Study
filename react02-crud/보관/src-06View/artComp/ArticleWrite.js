import React from "react";

function ArticleWrite(props){
  return (
    <article>
      <table border={1}>
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text'></input></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text'></input></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea cols='22' rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

export default ArticleWrite;