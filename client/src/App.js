import React from "react";
import { Container } from "semantic-ui-react";// import the ToDoList component
import ToDoList from "./ToDoList"; import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div>
      <Container>
        <ToDoList />
      </Container>
    </div>
  );
}
export default App;