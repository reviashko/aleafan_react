import React from 'react';
import QuestionList from './Questions/PollForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuestionList UserID="8" Host="http://localhost:8080"/>
      </header>
    </div>
  );
}

export default App;
