using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LejlekuXpress.Models
{
    public class BillingInformation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //CARD
        [Required]
        public string CardFirstName { get; set; }

        [Required]
        public string CardLastName { get; set; }

        [Required]
        public string CardNumber { get; set; }

        [Required]
        public string ExpirationDate { get; set; }

        [Required]
        public string CVV { get; set; }

        //ADDRESS
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public int CountryId { get; set; }
        public Country Country { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string ZipCode { get; set; }

        [Required]
        public string Address1 { get; set; }

        public string? Address2 { get; set; }


    }
}
