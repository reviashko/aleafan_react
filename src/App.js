import React from 'react';
import {default as UUID} from "node-uuid";
import QuestionList from './Questions/PollForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuestionList UserID={UUID.v4()} Host="http://localhost:8080"/>
      </header>
    </div>
  );
}

export default App;
