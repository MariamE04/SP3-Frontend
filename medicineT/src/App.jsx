import { Outlet } from 'react-router'
import Header from './components/header/Header'
import Footer from "./components/Footer.jsx"

function App() {

  return (
    <div>
      <Header/>
     <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
