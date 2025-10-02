import { Calendar, Check, Edit3, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";
import TodoForm from "./TodoForm";

function TodoItem({ todo, index }) {

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleToggle = () => {
      dispatch(toggleTodo(todo.id));
  }

  const handleDelete = () => {
    setIsDelete(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id))
    })
  }

  const handleUpdate = (text) => {
    dispatch(updateTodo({id: todo.id, updates: {text: text.trim()}}));
    setIsEditing(false);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-us", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if(isEditing){
    return <div className="p-4 bg-gray-100">
      <TodoForm initialValue={todo.text} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} placeholder="Update your Todo"/>
    </div>
  }

  return (
    <div
      className={`group p-4 hover:bg-gray-100 transition-all duration-200 ${
        isDelete
          ? "opacity-0 transform scale-95"
          : "opacity-100 transform scale-100"
      } ${todo.completed ? "opacity-75" : ""}`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: "slideInUp 0.3s ease-out forwards",
      }}
    >
      {/*Toggle Button*/}
      <div className="flex items-start gap-3">
        <button
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
              : "border-gray-400 hover:border-green-500 hover:bg-green-50"
          }`}
          onClick={handleToggle}
        >
         {todo.completed &&  <Check size={14} />}
        </button>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          <div className={`text-[19px] text-gray-800 leading-relaxed`}>{todo.text}</div>
            <div className="flex items-center gap-4 mt-2 text-xl text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span className="text-[8px]  sm:text-xs">Created {formatDate(todo.createdAt)}</span>
              </div>
              <span className="text-[8px] sm:text-xs">Update {formatDate(todo.updatedAt)}</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-100 xs:opacity-0 xs:group-hover:opacity-100 transition-all duration-200 ">
          <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200 "
          onClick={() => setIsEditing(true)}>
            <Edit3 size={16} />
          </button>
          <button 
          onClick={handleDelete}
          className="p-2 text-red-600  sm:text-gray-500  hover:text-red-600 hover:bg-gray-200 rounded-lg transition-all duration-200">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
