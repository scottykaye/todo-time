'use client'
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"



export default function Todo() {

  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [newTodoError, setNewTodoError] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState('');

  const validateTodo = newTodo.trim();

  function handleNewTodoOnBlur(e) {
    // setNewTodoError(validateTodo);
    setNewTodoError(!validateTodo && validateTodo.length === 0);
  }

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  function handleAddTodo(e) {
    setTodos((prevState) => [...prevState, { task: newTodo, id: Date.now(), isCompleted: false }]);
    setNewTodo("");
  }

  function handleDelete(id) {
    setTodos(prevState => prevState.filter(item => item.id !== id))
  }

  function handleEdit(id) {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing, } : todo
      )
    )

  }

  function handleCompleted(id) {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, } : todo
      )
    )
  }

  function handleUpdate(e, id) {
    setTodos(prevState => {
      const newData = prevState;
      const index = newData.findIndex(item => item.id === id);
      newData[index] = { ...newData[index], task: e.target.value }

      return prevState.map(item =>
        item.id === id ? { ...item, task: e.target.value } : item
      )
    })
  }



  return (
    <><header className="max-w-2xl mx-auto px-8 my-8 sticky top-0 backdrop-blur-sm py-4 border-border border-solid border-b">
      <h1>Todo 🗒️✏️</h1>
      {newTodoError && <p>Todo cannot be empty or only a series of spaces</p>}
      <form className="flex gap-4">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter" && validateTodo) {
              handleAddTodo(e);
            }
          }}
          onBlur={handleNewTodoOnBlur}
          onChange={handleNewTodo}
          value={newTodo}
          placeholder="Add an item"
        />
        <Button disabled={validateTodo.length === 0} onClick={handleAddTodo}>
          Add
        </Button>
      </form>
    </header>

      <main className="max-w-2xl mx-auto px-8">
        {
          todos?.length > 0 && (
            <ul>
              {todos.map((todo) => {
                const ElementCompleted = todo.isCompleted ? 's' : 'div'

                return (
                  <li className="flex flex-wrap items-center gap-2" key={todo.id}>
                    <Separator className="my-4 grow-1" />
                    {todo.isEditing ? (
                      <Input className="grow w-auto" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEdit(todo.id)
                        }
                      }} onChange={(e) => handleUpdate(e, todo.id)} onBlur={() => { handleEdit(todo.id) }} />
                    ) : (
                      <label className="flex items-center gap-4 grow">
                        <Checkbox onCheckedChange={() => handleCompleted(todo.id)} checked={todo.isCompleted} />
                        <ElementCompleted className="grow">{todo.task}</ElementCompleted>
                      </label>
                    )}
                    <Button onClick={() => {
                      handleEdit(todo.id)
                    }}>✏️</Button>
                    <Button onClick={() => handleDelete(todo.id)}>⌫</Button>

                  </li>
                );
              })}
            </ul>
          )
        }
      </main>
    </>
  );
}
