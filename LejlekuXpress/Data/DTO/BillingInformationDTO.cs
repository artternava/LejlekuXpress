using LejlekuXpress.Models;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class BillingInformationDTO
    {
        public int UserId { get; set; }
        public string CardFirstName { get; set; }
        public string CardLastName { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CVV { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CountryId { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Address1 { get; set; }
        public string? Address2 { get; set; }
    }
}
