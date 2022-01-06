import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';


function Atividade() {

  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined){
      const atividade = atividades.filter(atividade => atividade.id === id)
      setAtividade(atividade[0]);
    } else {
      setAtividade({id:0});
    } 
    setSmShowConfirmModal(!smShowConfirmModal);
  
  }

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


  const addAtividade = async (atividade) => {
    
      const response = await api.post('atividade', atividade);
      setAtividades([...atividades, response.data]);
      handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
      setAtividades([...atividadesFiltradas]);

    }
  
  }

  function pegarAtividade(id){
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  function cancelarAtividade(){
    setAtividade({id: 0});
    handleAtividadeModal();

  }

  const atualizarAtividade = async (atividade) => {

    const response = await api.put(`atividade/${atividade.id}`, atividade);
    
    const { id } = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item ))
      setAtividade({id: 0});
      handleAtividadeModal();
    }

  const novaAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }  



  return (
    <>

      <TitlePage title={'Atividade ' + (atividade.id !==0? atividade.id:'')}>
        <Button className="btn btn-outline-primary" variant="btn btn-outline-primary" onClick={novaAtividade} >
          <i className='fas fa-plus' ></i> 
        </Button>
      </TitlePage>  
      <AtividadeLista atividades={atividades} 
                      pegarAtividade={pegarAtividade} 
                      handleConfirmModal={handleConfirmModal}
                      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title><h1>Atividade {atividade.id !== 0 ? atividade.id : '' }</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm 
                atividades={atividades} 
                cancelarAtividade={cancelarAtividade}
                addAtividade={addAtividade} 
                atualizarAtividade={atualizarAtividade}
                atividadeSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>

      <Modal 
      size='sm'
      show={smShowConfirmModal}
      onHide={handleConfirmModal}
        >
        <Modal.Header closeButton>
          <Modal.Title> Excluindo Atividade {''} 
            {atividade.id !== 0 ? atividade.id : '' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a Atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <button className='btn btn-outline-success me-2' onClick={() => deletarAtividade(atividade.id)}>
            <i className='fas fa-check me-2'></i>
            Sim
          </button>
          <button className='btn btn-danger me-2' onClick={() => handleConfirmModal(0)}>
            <i className='fas fa-times me-2'></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Atividade;
