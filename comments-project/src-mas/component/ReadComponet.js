import React from 'react';

function ReadComponet(props) {
  return (
    <>
      <body>
        <h2>읽기(Read) - 댓글작성</h2>
        <form name='writeFrm'>
          <input type='hidden' name='num' value='<%=num %>' />
          <table id='boardTable'>
            <tr>
              <th>번호</th>
              <td>100</td>
              <th>작성자</th>
              <td>낙짜쌤</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td>2020.02.22</td>
              <th>조회수</th>
              <td>99</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colspan='3' class='subject'>
                오늘은 리엑트로 정했다.
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan='3' class='subject'>
                읽기 부분은 구현하지 않습니다. <br />
                아래 댓글 부분을 구현하면 됩니다.
              </td>
            </tr>
            <tr>
              <td colspan='4' align='center'>
                <button type='button' onclick=''>
                  수정하기
                </button>
                <button type='button' onclick=''>
                  삭제하기
                </button>
                <button type='button' onclick=''>
                  리스트
                </button>
              </td>
            </tr>
          </table>
        </form>

        <hr />

      </body>
    </>
  );
}

export default ReadComponet;
