using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Interface;
using AutoMapper;
using DynamiBugPlannerBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PlansController(IUnitOfWork unitOfWork = null!, IMapper mapper = null!)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        // GET: api/Plans/5
        [AllowAnonymous]
        [HttpGet("{id:long}", Name = "GetPlan")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPlan(long id)
        {
            try
            {
                var plan = await _unitOfWork.Plans.Get(q => q.Id == id, new List<string> { "Report" });

                if (plan != null)
                {
                    var result = _mapper.Map<BugFixDTO>(plan);
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // PUT: api/Plans/5
        [Authorize]
        [HttpPut("{id:long}", Name = "UpdatePlan")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]  
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]              
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdatePlan(long id, [FromBody] UpdateBugFixDTO planDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var plan = await _unitOfWork.Plans.Get(q => q.Id == id,  new List<string> { "Project" });

                if (plan != null)
                {
                    
                    // check if user is admin or account owner
                    var authorizedUser = CurrentUser();
                    if (authorizedUser.Id != plan.Project.UserId && authorizedUser.Role != "admin")                    
                    {
                        return Forbid();
                    }

                    _mapper.Map(planDTO, plan);
                    _unitOfWork.Plans.Update(plan);
                    await _unitOfWork.Save();

                    return NoContent();
                }
                return NotFound("Plan not found");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        private UserIdentityDTO CurrentUser()
        {
            return new UserIdentityDTO(User);
        }
    }
}
