using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int OwnerId { get; set; }
        public User Owner { get; set; }

        public bool IsApproved { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public byte[] Image { get; set; }

        public string Specifications { get; set; }

        [Required]
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        public bool IsReviewed { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ShippingPrice { get; set; }
    }

}
