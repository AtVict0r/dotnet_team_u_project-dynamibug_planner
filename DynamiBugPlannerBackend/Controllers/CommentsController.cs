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

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentsController(IUnitOfWork unitOfWork = null!, IMapper mapper = null!)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Comments/Report/5
        [HttpGet("Report/{id:long}", Name = "GetReportComments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetReportComments(long id)
        {
            try
            {
                var comments = await _unitOfWork.Comments.GetAll(expression: q => q.ReportId == id, includes: new List<string> { "User" });

                if (comments != null)
                {
                    var results = _mapper.Map<IList<CommentDTO>>(comments);
                    return Ok(results);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // POST: api/Comments
        // [Authorize]
        [HttpPost(Name = "CreateComment")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDTO commentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var comment = _mapper.Map<CommentModel>(commentDTO);
                await _unitOfWork.Comments.Insert(comment);
                await _unitOfWork.Save();
                return Ok();
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // DELETE: api/Comments/5
        // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}", Name = "DeleteComment")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteComment(long id)
        {
            if (id < 1)
            {
                return BadRequest();
            }

            try
            {
                var comment = await _unitOfWork.Comments.Get(q => q.Id == id);

                if (comment != null)
                {
                    await _unitOfWork.Comments.Delete(id);
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
