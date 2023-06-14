using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class ShabllonDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public int RoleId { get; set; }
    }
}
