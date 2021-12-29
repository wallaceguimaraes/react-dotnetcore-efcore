using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Data.Mappings
{
    public class AtividadeMap : IEntityTypeConfiguration<Atividade>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Atividade> builder) {

            builder.ToTable("Atividades");

            builder.HasKey( a => a.Id);

            builder.Property( a => a.Titulo)
                .HasColumnType("varchar(70)");

             builder.Property( a => a.Descricao)
                .HasColumnType("varchar(100)");

             builder.Property( a => a.Prioridade)
                .HasColumnType("varchar(15)");             
        }
        
    }
}