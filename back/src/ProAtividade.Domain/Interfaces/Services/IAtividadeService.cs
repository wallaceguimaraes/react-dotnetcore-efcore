using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AtualizarAtividade(Atividade model);

        Task<Atividade> AdicionarAtividade(Atividade model);

        Task<bool> DeletarAtividade(int atividadeId);
        
        Task<Atividade[]> PegarTodasAtividadesAsync();

        Task<Atividade> PegarAtividadePorIdAsync(int atividadeId);

        Task<Atividade[]> PegarAtividadePorNome(Atividade model);
    }
}