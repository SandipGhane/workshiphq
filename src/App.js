import React from 'react'
import Toolbar from "./ToolBar/Toolbar";
import { BrowserRouter } from "react-router-dom";
import CreativeBoard from './CreativeBoard/CreativeBoard';
function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <Toolbar />
      </header>
      <CreativeBoard />
    </BrowserRouter>
  );
}

export default App;
