import TodoApp from "./components/TodoApp"
import { store } from "./store/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider  store={store}>
      <TodoApp />
    </Provider>
  )
}

export default App