using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Http;


namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
      private readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                 var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                 if(atividades == null) return NoContent();

                 return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar recuperar usuários. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
         public async Task<IActionResult> Get(int id)
        {
             try
            {
                 var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                 if(atividade == null) return NoContent();

                 return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar recuperar a atividade com id: {id}. Erro: {ex.Message}");
            }
        }


       [HttpPost("GetByName")]
        public async Task<IActionResult> GetByName(Atividade model)
        {
             try
            {
                 var atividade = await _atividadeService.PegarAtividadePorNome(model);
                 if(atividade == null) return NoContent();

                 return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar recuperar a atividade. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {

                try
            {
                 var atividade = await _atividadeService.AdicionarAtividade(model);
                 if(atividade == null) return NoContent();

                 return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar adicionar a atividade {model.Titulo}. Erro: {ex.Message}");
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try
            {
                 if(model.Id != id)
                    this.StatusCode(StatusCodes.Status409Conflict,
                    $"Você está tentando atualizar uma atividade errada!");

                 var atividade = await _atividadeService.AtualizarAtividade(model);
                 if(atividade == null) return NoContent();

                 return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar atualizar a atividade {model.Titulo}. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){

        {
             try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync( id );
                if(atividade == null)
                    this.StatusCode(StatusCodes.Status409Conflict,
                    $"Você está tentando deletar um usuário errado!");

                 if(await _atividadeService.DeletarAtividade(id)){
                     return Ok( new { message = "Deletado!" });
                 }
                 return BadRequest("Ocorreu um problema específico ao deletar a atividade!");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar atualizar a atividade. Erro: {ex.Message}");
            } 
        }
    
        }
}

}