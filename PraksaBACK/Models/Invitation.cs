using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PraksaBACK.Model
{
    public class Invitation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public InvitationStatus Status { get; set; }
    }
}
