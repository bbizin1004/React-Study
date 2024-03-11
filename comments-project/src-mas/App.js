import './App.css';
import React from 'react';
import ReadComponet from './component/ReadComponet';
import CommentView from './component/CommentView';
import CommentWrite from './component/CommentWrite';
import { useState } from 'react';

function App() {
  const [topics, setTopics] = useState([
    { no: '1', Writer: '마스', Date: '2024-01-01', contents: '오늘은 React공부하는날' },
    { no: '2', Writer: '크리스마스', Date: '2024-02-01', contents: '어제는 Javascript공부하는날' },
    { no: '3', Writer: '8월의 크리스마스', Date: '2024-03-01', contents: '내일은 Project공부하는날' },
  ]);

  const [nextNo, setNextNo] = useState(3);

  const [mode, setMode] = useState('list');

  const [no, setNo] = useState(3);

  return (
    <div className='App'>
      <ReadComponet></ReadComponet>
      <CommentView topics={topics}></CommentView>
      <CommentWrite writeAction={(w,c) => {
          let addTopics = { no: nextNo, Writer: w, contents: c };
          let copyTopics = [...topics];
          copyTopics.push(addTopics);
          setTopics(copyTopics);
          setNextNo(nextNo + 1);
        }}
      ></CommentWrite>
    </div>
  );
}

export default App;
