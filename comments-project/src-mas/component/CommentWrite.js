import React from 'react';

function CommentWrite(props) {
  return (
    <form onSubmit={(event)=>{
      event.preventDefault();
      let writer= event.target.writer.value;
      let contents = event.target.contents.value;

      props.writeAction(writer,contents);
    }}>
      <table>
        <tr>
          <td>
            Writer : <input type='text' name='writer' size='40' />
          </td>
          <td rowspan='2'>
            <input type='submit' value='댓글작성' id='btn' />
          </td>
        </tr>
        <tr>
          <td>
            <textarea name='contents' cols='51' rows='5'></textarea>
          </td>
        </tr>
      </table>
    </form>
  );
}

export default CommentWrite;