using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PraksaBACK.Contexts;
using PraksaBACK.Model;

namespace PraksaBACK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
  
    public class EventsController : ControllerBase
    {
        private readonly EventPlannerContext _context;

        public EventsController(EventPlannerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents() => await _context.Events.ToListAsync();


        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            Event? eventItem = await _context.Events.FindAsync(id);

            return eventItem == null ? (ActionResult<Event>)NotFound() : (ActionResult<Event>)eventItem;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event eventItem)
        {
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, eventItem);
        }

      


    }
}
