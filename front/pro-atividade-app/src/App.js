import './App.css';
import Atividade from './pages/atividades/Atividade';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/atividades' component={Atividade} />
        <Route path='/clientes' component={Cliente} />
        <Route path='/home' component={Home} />
      </Routes>
    </Router>
  );
}


const Cliente = () => {
  <div>
    <h1>Cliente</h1>
    <hr></hr>
  </div>
}

const Home = () => {
  <div>
    <h1>Home</h1>
    <hr></hr>
  </div>
}

