using System.ComponentModel.DataAnnotations;

namespace PraksaBACK.Model
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        [Required]
        public string Location { get; set; }

        public string Description { get; set; }
    }
}
