import { Outlet } from 'react-router'
import '../style/App.css';
import Header from '../components/header/Header'

function App() {

  return (
    <div>
      <Header/>
     <Outlet/>
    </div>
  )
}

export default App
