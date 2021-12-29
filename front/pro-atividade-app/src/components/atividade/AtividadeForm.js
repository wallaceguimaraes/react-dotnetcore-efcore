import { useEffect, useState } from 'react'

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
}


export default function AtividadeForm(props) {

    const [ atividade, setAtividade ] = useState(atividadeAtual());

    useEffect(() => {
        if (props.atividadeSelecionada.id !== 0) {
            setAtividade(props.atividadeSelecionada);
        }
    }, [props.atividadeSelecionada]);
    /**
     * [] indica que so executa uma vez, quando inicia o componente
     */

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        /**
         * Nesse momento adiciona-se uma propriedade 'name' e seu 'value'
         * ex: name='id' value=1
         * 
         * id:1
         */
        setAtividade({...atividade, [name]: value}); 
    }
    
    function atividadeAtual() {
        if (props.atividadeSelecionada.id !== 0) {
            return props.atividadeSelecionada;
        }
        else {
            return atividadeInicial;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( props.atividadeSelecionada.id !== 0 ) {
            props.atualizarAtividade(atividade);
        }
        else {
            props.addAtividade(atividade);
            setAtividade(atividadeInicial);
        }
    }
  
    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarAtividade()
        setAtividade(atividadeInicial);
    }

    return (
        <>
            <h1>Atividade {atividade.id !== 0 ? atividade.id : '' }</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label">Título</label>
                    <input 
                        name="titulo"
                        id="titulo" 
                        value={atividade.titulo}
                        type="text" 
                        className="form-control"
                        onChange={inputTextHandler}
                        />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Prioridade</label>
                    <select 
                        name="prioridade"
                        value={atividade.prioridade}
                        id="prioridade" 
                        className="form-select"
                        onChange={inputTextHandler}
                    >
                        <option defaultValue="0">Selecione</option>
                        <option value="1">Baixa</option>
                        <option value="2">Normal</option>
                        <option value="3">Alta</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Descrição</label>
                    <textarea 
                        name="descricao"
                        id="descricao"
                        value={atividade.descricao} 
                        type="text" 
                        className="form-control"
                        onChange={inputTextHandler}
                    />
                <hr />
                </div>
                <div className="col-12 mt-0">
                    {
                        atividade.id === 0 ?
                        <button 
                            className="btn btn-outline-secondary"
                            type='submit' >
                            <i className='fas fa-plus me-2' ></i>
                             Atividade
                        </button>
                        :
                        <>
                            <button type='submit' className="btn btn-outline-success me-2" >
                                <i className='fas fa-plus me-2' ></i>
                                Salvar
                            </button>
                            <button className="btn btn-outline-warning"onClick={handleCancelar}>
                                <i className='fas fa-ban me-2' ></i>
 
                                Cancelar</button>
                        </>
                    }
                </div>
            </form>
        </>
    )
}
