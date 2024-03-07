import React from "react";

function ArticleList(props) {
  const lists = [];
  for (let i = 0; i < props.topics.length; i++) {
    let row = props.topics[i];
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode(row.no);
          }}>{row.title}</a></td>
        <td>{row.writer}</td>
        <td>{row.date}</td>
      </tr>
    );
  }
  return (
    <article>
      <table border='1'>
        <thead>
          <tr>
            <th>NO</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  );
}

export default ArticleList;