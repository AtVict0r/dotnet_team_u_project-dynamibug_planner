using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Models;
using DynamiBugPlannerBackend.Interface;
using AutoMapper;
using DynamiBugPlannerBackend.Data;
using Microsoft.AspNetCore.Authorization;

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProjectsController(IUnitOfWork unitOfWork  = null!, IMapper mapper = null!)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Projects
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProjects()
        {
            try
            {
                var projects = await _unitOfWork.Projects.GetAll();
                var results = _mapper.Map<IList<ProjectDTO>>(projects); 
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/Projects/5
        [HttpGet("{id:long}", Name = "GetProject")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProject(long id)
        {
             try
            {
                var project = await _unitOfWork.Projects.Get(q => q.Id == id, new List<string> { "Reports"} );
                var result = _mapper.Map<ProjectDTO>(project); 
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // POST: api/Projects
        // [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO projectDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var project = _mapper.Map<ProjectModel>(projectDTO);
                await _unitOfWork.Projects.Insert(project);
                await _unitOfWork.Save();
                return CreatedAtRoute("GetProject", new { id = project.Id }, project);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // PUT: api/Projects/5
        [HttpPut("{id:long}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProject(long id, [FromBody] UpdateProjectDTO projectDTO)
        {
            if(!ModelState.IsValid || id < 1 || id != projectDTO.Id)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var project = await _unitOfWork.Projects.Get(q => q.Id == id);

                if(project != null)
                {
                    _mapper.Map(projectDTO, project);
                    _unitOfWork.Projects.Update(project);
                    await _unitOfWork.Save();

                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteProject(long id)
        {
            if(id < 1)
            {
                return BadRequest();
            }

            try
            {
                var project = await _unitOfWork.Projects.Get(q => q.Id == id);
                
                if (project != null)
                {
                    await _unitOfWork.Projects.Delete(id);
                    await _unitOfWork.Save();

                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }   
        }
    }
}