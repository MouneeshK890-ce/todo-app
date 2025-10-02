import { CheckCircle2, Circle, Filter, Plus, Trash2 } from "lucide-react";

import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectFilteredTodos,
  selectIsAddingTodo,
  selectTodos,
  selectTodosStats,
} from "../store/selectors";

import {clearCompleted, markAllComplete, setFilter, setIsAddingTodo} from "../store/todoSlice"

const TodoApp = () => {

  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodosStats);
  const filter = useSelector(selectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);

  const handleFilterChange = (newFilter) => {
      dispatch(setFilter(newFilter));
  }

  const handleAddTodo = () => {
        dispatch(setIsAddingTodo(true));
  };

  const handleMarkAllComplete = () => {
    dispatch(markAllComplete());
  }

  const handleClearComplete = () => {
    dispatch(clearCompleted());
  }


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-8 px-4
    "
    >
      <div className="max-w-2xl mx-auto">
        {/* Heaeder */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl text-gray-800 mb-2">Todo App</h1>
          <p>Organize your life, one task at a time</p>
        </div>

        {/* Status Card */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h2>
              <div className="text-2xl font-bold text-green-600">
                {/* Stats Completed Logics */}
                {stats.completionPercentage}%
              </div>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
              {/* Progressbar */}
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Total Logic */}
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Active Logic */}
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Completed Logic */}
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Todo Container */}
        <div className=" bg-white/90 backdrop-blur-sm rounded-b-2xl border border-gray-300 shadow-lg overflow-hidden">
          {/* Action Bar */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <button className="shortHand-add flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer" onClick={handleAddTodo}>
                <Plus size={20} /> Add Todo
              </button>

              {/* Clear and Delete Buttons */}
              {stats.total > 1 && (
                <div className="flex items-end gap-2 ">
                  {stats.completed > 0 && (
                    <button className="shortHand-but flex items-center gap-3 leading text-red-600 hover:text-red-700 bg-red-50 sm:bg-transparent sm:hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-200 text-sm" onClick={handleClearComplete}>
                      {" "}
                      <Trash2 size={16} /> Clear Completed
                    </button>
                  )}
                  {stats.active > 0 && (
                    <button className="shortHand-but flex items-center gap-3 text-green-600 hover:text-green-700 bg-green-50 sm:bg-transparent sm:hover:bg-green-50 px-3 py-2 rounded-lg transition-colors duration-200 text-sm" onClick={handleMarkAllComplete}>
                      {" "}
                      <CheckCircle2 size={16} /> Mark All Done
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Todo Filters I will add Logics */}
            <TodoFilters currentFillter={filter} stats={stats} onFilterChange={handleFilterChange} />
          </div>

          {/* Todo Form */}
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100">
              <TodoForm placeholder="What need to be done" />
            </div>
          )}

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-12 text-center">
                {todos.length === 0 ? (
                  <div className="text-gray-600">
                    <Circle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className=" text-lg font-medium mb-2 text-gray-800">
                      No Todos Yet
                    </p>
                    <p>Add your first todo to get started!</p>
                  </div>
                ) : (
                  <div className=" text-gray-600">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <div className="text-lg font-medium mb-2 text-gray-800">
                      No {filter} Todos
                      <p className="text-sm">
                        {filter === "completed" &&
                          "all your todos are not completed"}
                        {filter === "active" &&
                          "No completed todos yet, keep going"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {filteredTodos.map((todo, index) => {
                  return <TodoItem key={todo.id} todo={todo} index={index} />;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-sm text-gray-700">{stats.total} of {stats.active} Tasks Remaining</div>
      </div>
    </div>
  );
};

export default TodoApp;
