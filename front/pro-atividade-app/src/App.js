import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/atividade/AtividadeForm';
import AtividadeLista from './components/atividade/AtividadeLista';


/* let initialState = [
  { id: 1, titulo: 'Titulo 1', descricao: 'Primeira Atividade',  prioridade: '1' },
  { id: 2, titulo: 'Titulo 2', descricao: 'Segunda Atividade',  prioridade: '1'},
]; */

function App() {

  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) :
    setIndex(Math.max.apply(Math, atividades.map( item => item.id)) + 1); 
  }, [atividades])


  function addAtividade(atividade) {
    
      setAtividades([...atividades, 
        {...atividade, id: index}]);
  }

  function deletarAtividade(id){
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
    setAtividades([...atividadesFiltradas]);
  }

  function pegarAtividade(id){
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0]);
  }

  function cancelarAtividade(){
    setAtividade({id: 0});
  }

  function atualizarAtividade(atividade) {
      setAtividades(atividades.map(item => item.id === atividade.id ? atividade : item ))
      setAtividade({id: 0});
    }



  return (
    <>
      <AtividadeForm 
                atividades={atividades} 
                cancelarAtividade={cancelarAtividade}
                addAtividade={addAtividade} 
                atualizarAtividade={atualizarAtividade}
                atividadeSelecionada={atividade}
      />
      <AtividadeLista atividades={atividades} 
                      deletarAtividade={deletarAtividade}
                      pegarAtividade={pegarAtividade} />
    </>
  );
}

export default App;
