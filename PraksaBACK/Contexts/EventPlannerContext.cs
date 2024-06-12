using Microsoft.EntityFrameworkCore;
using PraksaBACK.Model;

namespace PraksaBACK.Contexts
{
    public class EventPlannerContext : DbContext
    {
        public EventPlannerContext(DbContextOptions<EventPlannerContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Invitation> Invitations { get; set; }

       
    }
}
