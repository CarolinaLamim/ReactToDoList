import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Tasks from "./components/tasks";
import './App.css';
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  //const message = 'Hello World!'
  const [tasks, setTasks] = useState([
{
  id:'1',
  title: 'Estudar Programação',
  completed: false,
},
{
  id: '2',
  title: 'Ler Livros',
  completed: true,
},

  ]); //ele gera um state

useEffect(() => { //não pode ser assincrono, precisa criar outra função
    const fetchTasks = async () => {
    const { data } = await axios.get("https://jsonplaceholder.cypress.io/todos?_limit=10")

      setTasks(data);
  }; 

fetchTasks();

}, []); // [] vazio, só executa quando o ambiente é renderizado pela primeira vez

const handleTaskClick = (taskId) => {
     const newTasks = tasks.map((task) => {
       if (task.id === taskId) return {
         ...task, completed: !task.completed}

         return task;
       
     });

     setTasks(newTasks);
};
  
const handleTaskAddition = (taskTitle) => {
  const newTasks = [...tasks,{
    title: taskTitle,
    id: uuidv4(),
    completed: false,
  }]

setTasks(newTasks);

}

const handleTaskDeletion = (taskId) => {
  const newTasks = tasks.filter((task) => task.id !== taskId);

  setTasks(newTasks)
};

  return (
  <BrowserRouter>
    <div className="container">
      <Header />
          <Route
                 path="/"
                 exact
                 element={<App/>}
                 render={() => (
                    <>
                      <AddTask handleTaskAddition={handleTaskAddition} />
                      <Tasks
                       tasks={tasks}
                       handleTaskClick={handleTaskClick}
                       handleTaskDeletion={handleTaskDeletion}/>
                   </>
                    )}
          />
          <Route path="/:taskTitle" exact component={TaskDetails} />
     
    </div>
  </BrowserRouter>
  
  );
};

export default App;
