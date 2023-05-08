namespace LejlekuXpress.Data.DTO
{
    public class UserRegistrationDTO
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string ConfirmPassword { get; set; } = string.Empty;
        public int Role { get; set; } 
    }
}
