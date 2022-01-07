import './App.css';
import Atividade from './pages/atividades/Atividade';
import Cliente from './pages/clientes/Cliente';
import Home from './pages/home/Home';
import { Route, Routes, Switch } from 'react-router-dom'; 
import Dashboard from './pages/dashboard/Dashboard';
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  /**
   * Caso ocorra alguma instabilidade ao exibir rotas
   * implementar o Switch
   */
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard/>} />
      <Route path='/atividade/lista' element={<Atividade/>} />
      <Route path='/cliente/lista' element={<Cliente/>} />
      <Route path='/cliente/:id/atividade' element={<Cliente/>} />
      <Route path='/cliente/detalhe/' element={<ClienteForm/>} />
      <Route path='/cliente/detalhe/:id' element={<ClienteForm/>} />
      <Route element={<PageNotFound/>} />
    </Routes>
      );
}
