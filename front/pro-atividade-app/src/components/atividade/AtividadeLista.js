import React from 'react'
import Atividade from './Atividade'

export default function AtividadeLista(props) {
    return (
        <div className="mt-3">
        { props.atividades.map(atividade => ( 
          <Atividade 
                  key={atividade.id} 
                  atividade={atividade} 
                  pegarAtividade={props.pegarAtividade}
                  handleConfirmModal={props.handleConfirmModal}
          />
        ))}
      </div>
    )
}
