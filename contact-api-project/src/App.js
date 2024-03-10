import "./App.css";
import { React, useState, useEffect } from "react";

function Contacts(props) {
  var [myJSON, setmyJSON] = useState({ contacts: [] });

  useEffect(function () {
    fetch("https://sample.bmaster.kro.kr/contacts?pageno=2")
      .then((result) => {
        console.log(result);
        return result.json();
      })
      .then((json) => {
        console.log(json);
        setmyJSON(json);
      });
    return () => {
      console.log("useEffect실행 ==>컴포넌트 언마운트");
    };
  }, []);

  let cTag = myJSON.contacts.map((data) => {
    return (
      <tr key={data.no}>
        <td>
          <img src={data.photo} alt="{data.no}" />
        </td>
        <td>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              props.onProfile(data);
            }}
          >
            {data.name}
          </a>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>연락처 API 연동하기</h2>

      <div className="left">
        <table border="1" width="300">
          <thead>
            <tr>
              <th>photo</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>{cTag}</tbody>
        </table>
      </div>
    </>
  );
}

const ContactInfo = (props) => {
  return (
    <div className="right">
      <h3></h3>
      <p>no:</p>
      <p>name:</p>
      <p>tel:</p>
      <p>address:</p>
      <p>photo:</p>
    </div>
  );
};

function App() {
  var [info, setInfo] = useState({});

  return (
    <div className="App">
      <Contacts
        onProfile={(sData) => {
          console.log(sData);
        }}
      ></Contacts>
      <ContactInfo info={info}></ContactInfo>
    </div>
  );
}

export default App;
