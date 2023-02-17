using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Data;

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ReportsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportModel>>> GetBugReports()
        {
            return await _context.BugReports.ToListAsync();
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReportModel>> GetReportModel(long id)
        {
            var reportModel = await _context.BugReports.FindAsync(id);

            if (reportModel == null)
            {
                return NotFound();
            }

            return reportModel;
        }

        // PUT: api/Reports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReportModel(long id, ReportModel reportModel)
        {
            if (id != reportModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(reportModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReportModel>> PostReportModel(ReportModel reportModel)
        {
            _context.BugReports.Add(reportModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReportModel", new { id = reportModel.Id }, reportModel);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportModel(long id)
        {
            var reportModel = await _context.BugReports.FindAsync(id);
            if (reportModel == null)
            {
                return NotFound();
            }

            _context.BugReports.Remove(reportModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReportModelExists(long id)
        {
            return _context.BugReports.Any(e => e.Id == id);
        }
    }
}
