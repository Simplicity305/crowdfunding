import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//we're doing it this way because the main thing from react router dom contains many components?

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import ListProjectsPage from "./pages/ListProjectsPage";

// Components
import Nav from "./components/Nav/Nav";

//CSS
import "./App.css";
import { AuthProvider } from "./LoginProvider";

//Creating header layout 
// 	- Not using curly brackets  is using smooth brackets 
// 	- Because its an implicit return 
// Because not returning any function or state - just want it to return straight away 

const HeaderLayout = () => (
  <div>
    <Nav />
    <Outlet />
  </div>
);


const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/projects", element: <ListProjectsPage /> },
    ],
  },
]);

function App() {
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>;
}

export default App;



















// import { useState } from 'react' //
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App
