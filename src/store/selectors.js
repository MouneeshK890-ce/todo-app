import { createSelector } from "@reduxjs/toolkit";


// Basic Selectors
export const selectTodos = (state) => state.todos.items; // target store -> initialState -> items: []
export const selectFilter = (state) => state.todos.filter // target store -> initialState -> filter:"all"

export const selectIsAddingTodo = (state) => state.todos.isAddingTodo;

// Filter Items
export const selectFilteredTodos = (state) => {
    const todos = state.todos.items;
    const fillter = state.todos.filter;

    switch(fillter){
        case "active" :
            return todos.filter((todo) => !todo.completed);
        case "completed" :
            return  todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}

// export const selectTodosStats = (state) => {
//     const todos = state.todos.items;
//     const total = todos.length;
//     const completed = todos.filter((todo) => todo.completed).length;
//     const active = total - completed;
//     const completionPercentage = total > 0 ? Math.round((completed/total) * 100) : 0;

//     return {todos, total, completed, active, completionPercentage}
// };


export const selectTodosStats = createSelector(
  (state) => state.todos.items,
  (todos) => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    const completionPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { todos, total, completed, active, completionPercentage };
  }
);


