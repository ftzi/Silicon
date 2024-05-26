import viteLogo from "/vite.svg"
import reactLogo from "./assets/react.svg"
import "./App.css"
import { FallingSand } from "./Sand"

const App = () => (
  <>
    <FallingSand />
    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  </>
)

export default App
