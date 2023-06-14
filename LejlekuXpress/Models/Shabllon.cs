using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Models
{
    public class Shabllon
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        //Foreign Key \/ (only for user to communicate with institution ex.Bank)
        [Required]
        public int RoleId { get; set; }
        public Roles Role { get; set; }
    }
}
