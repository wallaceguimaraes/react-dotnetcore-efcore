using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo
    {
        private readonly DataContext _context;

        public AtividadeRepo(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = _context.Atividades;
            query = query.AsNoTracking()
                         .OrderBy(a => a.Id)
                         .Where(a => a.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade[]> PegaPorNome(Atividade atividade)
        {
            IQueryable<Atividade> query = _context.Atividades;

             query = query.AsNoTracking()
                            .OrderBy(a => atividade.Id)
                            .Where(a => EF.Functions.Like(a.Titulo , '%'+atividade.Titulo+'%' ));
            
            return await query.ToArrayAsync();
        }

        public async Task<Atividade[]> PegaTodosAsync()
        {   
            IQueryable<Atividade> query = _context.Atividades;
            
             query = query.AsNoTracking()
                         .OrderBy(a => a.Id);

            return await query.ToArrayAsync();
        }

    }
}