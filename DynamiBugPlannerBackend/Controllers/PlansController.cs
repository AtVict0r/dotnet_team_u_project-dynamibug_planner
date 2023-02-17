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
    public class PlansController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PlansController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Plans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BugFixModel>>> GetPlans()
        {
            return await _context.Plans.ToListAsync();
        }

        // GET: api/Plans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BugFixModel>> GetBugFixModel(long id)
        {
            var bugFixModel = await _context.Plans.FindAsync(id);

            if (bugFixModel == null)
            {
                return NotFound();
            }

            return bugFixModel;
        }

        // PUT: api/Plans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBugFixModel(long id, BugFixModel bugFixModel)
        {
            if (id != bugFixModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(bugFixModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BugFixModelExists(id))
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

        // POST: api/Plans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BugFixModel>> PostBugFixModel(BugFixModel bugFixModel)
        {
            _context.Plans.Add(bugFixModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBugFixModel", new { id = bugFixModel.Id }, bugFixModel);
        }

        // DELETE: api/Plans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBugFixModel(long id)
        {
            var bugFixModel = await _context.Plans.FindAsync(id);
            if (bugFixModel == null)
            {
                return NotFound();
            }

            _context.Plans.Remove(bugFixModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BugFixModelExists(long id)
        {
            return _context.Plans.Any(e => e.Id == id);
        }
    }
}
