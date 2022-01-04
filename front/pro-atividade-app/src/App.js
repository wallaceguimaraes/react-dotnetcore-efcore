import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/atividade/AtividadeForm';
import AtividadeLista from './components/atividade/AtividadeLista';
import api from './api/atividade';


/* let initialState = [
  { id: 1, titulo: 'Titulo 1', descricao: 'Primeira Atividade',  prioridade: '1' },
  { id: 2, titulo: 'Titulo 2', descricao: 'Segunda Atividade',  prioridade: '1'},
]; */

function App() {

  const [index] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');

    console.log(response.data)
    return response.data;
  }

  useEffect(() => {
      const getAtividades = async () => {
        const todasAtividades = await pegaTodasAtividades();
        if(todasAtividades){
          setAtividades(todasAtividades);
        }
      }

      getAtividades();
  }, [])


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
