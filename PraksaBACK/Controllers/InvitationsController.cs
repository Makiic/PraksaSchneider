using Microsoft.AspNetCore.Mvc;
using PraksaBACK.Contexts;
using PraksaBACK.Model;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using PraksaBACK.MailUtil;


namespace PraksaBACK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        private readonly EventPlannerContext _context;
        private readonly IMailService _mailService;

        public InvitationsController(EventPlannerContext context, IMailService mailService)
        {
            _context = context;
            _mailService = mailService;

        }

        [HttpPost("{eventId}/invite")]
        public async Task<IActionResult> SendInvitation(int eventId, [FromBody] Invitation invitation)
        {
            var eventItem = await _context.Events.FindAsync(eventId);
            if (eventItem == null)
            {
                return NotFound(new { message = "Event not found" });
            }

            invitation.EventId = eventId;
            int invitationId = invitation.Id;
            _context.Invitations.Add(invitation);
           
            await _context.SaveChangesAsync();

            var subject = $"Invitation to {eventItem.Name}";
            var body = $"You are invited to {eventItem.Name} on {eventItem.Date.ToShortDateString()} at {eventItem.Time}. Location: {eventItem.Location}.\n\nDescription: {eventItem.Description}";

            var mailData = new MailData(
                to: new List<string> { invitation.Email },
                subject: subject,
                body: body
            );

            var mailSent = await _mailService.SendMail(mailData);

            if (mailSent)
            {
                invitation.Status = InvitationStatus.Sent;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Invitation sent successfully", invitationId = invitationId });
            }
            else
            {
                invitation.Status = InvitationStatus.Pending;
                await _context.SaveChangesAsync();
                return StatusCode((int)HttpStatusCode.InternalServerError, new { message = "Failed to send invitation" });
            }
        }



    }
}

