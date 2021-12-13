import React, {  useState, useContext, useEffect } from "react"
import { GlobalContext } from "../GlobalContext"

export default function TodoList() {
  const globalContext = useContext(GlobalContext)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  function fetchTodos() {
    setLoading(true);
    globalContext.axios
      .get("http://localhost/360wellness/test/backend/public/api/todos")
      .then(res => {
        if (res.data.success) {
          setTodos(res.data.data.todos)
        } else {
          console.error(res.data);
        }
      }).finally(() => setLoading(false));
  }

  useEffect(() => {
    globalContext.initAxios();
    fetchTodos()
  }, [])

  function saveTodo(i, event) {
    let {id, content} = todos[i];
    if (id) {
      event.target.disabled = true
      globalContext.axios
        .put("http://localhost/360wellness/test/backend/public/api/todo/"+id, { content })
        .then(res => {
          if (res.data.success) {
            alert('Updated successfully!')
          } else {
            console.error(res.data);
          }
        }).finally(() => event.target.disabled = false);
    } else {
      event.target.disabled = true;
      globalContext.axios
        .post("http://localhost/360wellness/test/backend/public/api/todo", { content })
        .then(res => {
          if (res.data.success) {
            setTodos(state => {
              const todo = [...state];
              todo[i].id = res.data.data.todo.id
              return todo;
            });
            alert('Saved successfully!')
          } else {
            console.error(res.data);
          }
        }).finally(() => event.target.disabled = false);
    }
  }

  async function deleteTodo(i, event) {
    let { id } = todos[i];
    if(id) {
      event.target.disabled = true;
      await globalContext.axios
        .delete("http://localhost/360wellness/test/backend/public/api/todo/"+id)
        .then(res => {
          if (res.data.success) {
            alert('Deleted successfully!')
          } else {
            console.error(res.data);
            throw new Error('Error while deleteing todo');
          }
        }).finally(() => event.target.disabled = false);
    }
    setTodos(state => {
      const todos = state.filter((todo, index, todos) => {
        return index != i
      });
      return todos;
    });
  }

  function newTodo() {
    let t = {
      id: '',
      content: ''
    }
    setTodos([...todos, t])
  }

  function onChangeTodo(event, i) {
    let { value } = event.target;
    setTodos(state => {
      const updated = [...state];
      updated[i].content = value
      return updated;
    });
  }

  return (
    <>
      <div className="text-center">
        <button onClick={newTodo}>New Todo</button>
        <table style={{ 'maxHeight': '700px', 'width': '1200px', 'margin': 'auto' }}>
          <thead>
            <tr>
              <td width="10%">ID</td>
              <td width="70%">Todo</td>
              <td width="20%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              loading
              ?
              <tr>
                <td></td>
                <td className="text-center">
                  <h1>Loading...</h1>
                </td>
                <td></td>
              </tr>
              :
                todos.map(function (item, i) {
                  return <tr key={i}>
                    <td>{item.id || 'NA'}</td>
                    <td><textarea value={item.content} onInput={(event) => onChangeTodo(event, i)}></textarea></td>
                    <td>
                      <button onClick={(event) => {saveTodo(i, event)}}> Save</button>
                      <button onClick={(event) => {deleteTodo(i, event)}}> Delete</button>
                    </td>
                  </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}