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
    public class ReportsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReportsController(IUnitOfWork unitOfWork = null!, IMapper mapper = null!)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Reports
        [AllowAnonymous]
        [HttpGet(Name = "GetReports")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetReports()
        {
            try
            {
                var reports = await _unitOfWork.Reports.GetAll(expression: q => q.Project.IsArchived == false, includes: new List<string> { "Project", "Plan", "Comments", "User" });
                var results = _mapper.Map<IList<ReportDTO>>(reports);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/Reports/5
        [AllowAnonymous]
        [HttpGet("{id:long}", Name = "GetReport")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetReport(long id)
        {
            try
            {
                var report = await _unitOfWork.Reports.Get(q => q.Id == id, new List<string> { "Project", "Plan", "Comments", "User" });

                if (report != null)
                {
                    var result = _mapper.Map<ReportDTO>(report);
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // POST: api/Reports
        [Authorize] // signed in
        [HttpPost(Name = "CreateReport")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateReport([FromBody] CreateReportDTO reportDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var report = _mapper.Map<ReportModel>(reportDTO);
                await _unitOfWork.Reports.Insert(report);
                var plan = _mapper.Map<BugFixModel>(new CreateBugFixDTO
                    {
                        Html = "",
                        ReportId = report.Id,
                        ProjectId = report.ProjectId,
                    });
                await _unitOfWork.Plans.Insert(plan);
                await _unitOfWork.Save();
                return CreatedAtRoute("GetReport", new { id = report.Id }, report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // PUT: api/Reports/5
        [Authorize(Roles = "admin, manager")]
        [HttpPut("{id:long}", Name = "UpdateReport")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateReport(long id, [FromBody] UpdateReportDTO reportDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var report = await _unitOfWork.Reports.Get(q => q.Id == id);

                if (report != null)
                {
                    _mapper.Map(reportDTO, report);
                    _unitOfWork.Reports.Update(report);
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

        // DELETE: api/Reports/5
        [Authorize]
        [HttpDelete("{id}", Name = "DeleteReport")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteReport(long id)
        {
            if (id < 1)
            {
                return BadRequest();
            }

            try
            {
                var report = await _unitOfWork.Reports.Get(q => q.Id == id, new List<string> { "Project" });

                if (report != null)
                {
                    // check if user is admin or project owner
                    var authorizedUser = CurrentUser();
                    if (authorizedUser.Id != report.Project.UserId && authorizedUser.Role != "admin")                    
                    {
                        return Forbid();
                    }

                    await _unitOfWork.Reports.Delete(id);
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

        private UserIdentityDTO CurrentUser()
        {
            return new UserIdentityDTO(User);
        }
    }
}
