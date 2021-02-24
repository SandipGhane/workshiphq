import React from 'react'
import Toolbar from "./ToolBar/Toolbar";
import { BrowserRouter, Route } from "react-router-dom";
import CreativeBoard from './CreativeBoard/CreativeBoard';
import ThingsToDo from './ThingsToDo/ThingsToDo';
function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <Toolbar />
      </header>
      <Route path="/" exact component={CreativeBoard} />
      <Route path="/thingstodo" exact component={ThingsToDo} />
    </BrowserRouter>
  );
}

export default App;
