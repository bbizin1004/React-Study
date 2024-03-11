import React from 'react';

function CommentView(props) {
  const lists = [];

  for (let i = 0; i < props.topics.length; i++) {
    let row = props.topics[i];
    lists.push(
      <table id='boardTable'>
        <tr key={row.no}>
          <td>{row.no}</td>
          <td>Writer:{row.Writer}</td>
          <td>
            Date:{row.Date}
            <button type='button' onclick=''>
              수정
            </button>
            <button type='button' onclick=''>
              삭제
            </button>
          </td>
        </tr>
        <tr>
          <td colspan='3' class='subject'>
           {row.contents}
          </td>
        </tr>
      </table>
    );
  }

  return (
    <article>
      {/*번호는 1부터 자동부여.
          날짜는 Date객체 사용하여 현재날짜 및 시간 입력
          작성자와 내용은 사용자가 입력.
          수정 버튼 누르면 작성폼에 기존내용 로드
          삭제는 confirm창으로 물어본 후 처리 
  
      <!-- 반복 -->  */}
      {lists}
    </article>
  );
}

export default CommentView;
