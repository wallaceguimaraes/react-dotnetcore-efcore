import api from '../api/atividade';

const AtividadeService = {

    async create(params) {
        const response = await api.post('atividade', params);
        return response;
    },

    async getAll() {
        const response = await api.get('atividade');
        return response;
    },

    async delete(id) {
       const response = await api.delete(`atividade/${id}`);
       return response;
    },

    async update(params){
        const response = await api.put(`atividade/${params.id}`, params);
        return response;
    }

}

export { AtividadeService };