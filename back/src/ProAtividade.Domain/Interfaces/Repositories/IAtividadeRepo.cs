using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;


namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<Atividade[]> PegaTodosAsync();

        Task<Atividade> PegaPorIdAsync(int id);

        Task<Atividade[]> PegaPorNome(Atividade usuario);
    }
}