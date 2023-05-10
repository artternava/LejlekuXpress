using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Models
{
    public class Country
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Iso { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string NiceName { get; set; }

        public string? Iso3 { get; set; }

        public int? NumCode { get; set; }

        public int? PhoneCode { get; set; }
    }
}
