import { Check, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, setIsAddingTodo } from "../store/todoSlice";

function TodoForm({
  onSubmit,
  onCancel,
  initialValue = "",
  placeholder = "Add a new Todo...",
}) {

  const dispatch = useDispatch();

  const [text, setText] = useState(initialValue);
  const inputRef = useRef(null);

  const handleSubmit = (e) =>{
    e.preventDefault();
    const trimmedText = text.trim();

    if(trimmedText){
      if(onSubmit){
        // for Editing
        onSubmit(trimmedText)
      }else{
        dispatch(addTodo(trimmedText));
      }

      setText("");
    }
  };

   const handleCancel = () => {
    if(onCancel){
      onCancel();
    }else{
      dispatch(setIsAddingTodo(false))
    }

    setText("");
   }

   const handleKeyDown = (event) => {
      if(event.key === "Escape"){
        handleCancel();
        console.log("Success");
        
      }
   }

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
          type="text"
          className="w-full px-4 py-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-gray-600"
          maxLength={500}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed
          text-white rounded-lg transition-colors duration-200"
          title="Save todo"
          
        >
          <Check size={18} />
        </button>
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed
          text-white rounded-lg transition-colors duration-200"
          title="Cancel"
          onClick={handleCancel}
        >
          <X size={18} />
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
