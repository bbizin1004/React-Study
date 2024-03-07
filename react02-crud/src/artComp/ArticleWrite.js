import React from "react";

function ArticleWrite(props){
  return (
    <article>
      {/* 글쓰기 폼에서 submit 이벤트가 발생되면 핸들러를 통해 감지한 후 폼값을 처리한다. */}
      <form onSubmit={(event)=>{
        //submit 이벤트에 의한 새로고침 차단
        event.preventDefault();
        //이벤트 객체의 target속성을 이용해서 입력값을 저장
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;


        console.log('ArticleWrite컴포', title,writer,contents);
        /* 부모가 props를 통해 전달한 함수를 호출하여 부모쪽으로 데이터를 전달 */
        props.writeAction(title,writer,contents);
      }}>
        <table border={1}>
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text' name="writer"></input></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name="title"></input></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols='22' rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송"></input>
      </form>

      
    </article>
  )
}

export default ArticleWrite;