import './App.css';
import React from 'react';

function App(props) {
  return (
    <div className="App">
      { props.children }
    </div>
  );
}

export default App;
