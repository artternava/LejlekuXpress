using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace LejlekuXpress.Models
{
    public class User
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

        public byte[]? PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        public byte[]? ProfilePicture { get; set; }

        [Required]
        public int RoleId { get; set; }
        public Roles Role { get; set; }

    }
}
