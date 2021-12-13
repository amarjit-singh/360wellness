import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TodoList from "./components/TodoList"
import Login from "./components/Login"
import Signup from "./components/Signup"
import PrivateRoute from "./PrivateRoute"
import UpdateProfile from "./components/UpdateProfile"
import { GlobalContextProvider } from "./GlobalContext"

function App() {
  
  return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">
            React Todo App
          </h1>
        </header>
          <BrowserRouter>
            <GlobalContextProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<TodoList/>}></Route>
                <Route exact path='/update-profile' element={<UpdateProfile/>}></Route>
              </Route>
              <Route exact path="/signup" element={<Signup/>}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
            </Routes>
            </GlobalContextProvider>
          </BrowserRouter>
      </div>
  );
}

export default App;
