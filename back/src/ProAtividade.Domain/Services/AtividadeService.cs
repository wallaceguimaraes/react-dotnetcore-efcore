using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;


namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {

        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo){
            _atividadeRepo = atividadeRepo;

        }
        public async Task<Atividade> AdicionarAtividade(Atividade model){
            
            if(await _atividadeRepo.PegaPorIdAsync(model.Id) == null){
                _atividadeRepo.Adicionar(model);
                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }
 
        public async Task<Atividade> AtualizarAtividade(Atividade model){
              
               if(await _atividadeRepo.PegaPorIdAsync(model.Id) != null){
                _atividadeRepo.Atualizar(model);
                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
                }

            return null;

        } 

         public async Task<bool> DeletarAtividade(int id){
            var atividade = await _atividadeRepo.PegaPorIdAsync(id);
            if (atividade == null) throw new Exception("O usuário que você tentou inativar não existe!");

             _atividadeRepo.Deletar(atividade); 
            return await _atividadeRepo.SalvarMudancasAsync();
            }
 
       public async Task<Atividade[]> PegarTodasAtividadesAsync(){
            try
            {
                var atividades = await _atividadeRepo.PegaTodosAsync(); 
                    if(atividades == null) return null;

                    return atividades;
            }
            catch (System.Exception ex)
            { 
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarAtividadePorNome(Atividade model){
            try
            {
                var atividades = await _atividadeRepo.PegaPorNome(model); 
                    if(atividades == null) return null;

                    return atividades;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }   

       public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId){
            try
            {
                var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId); 
                    if(atividade == null) return null;

                    return atividade;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }

}