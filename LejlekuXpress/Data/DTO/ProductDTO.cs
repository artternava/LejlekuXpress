using LejlekuXpress.Models;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class ProductDTO
    {
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public byte[] Image { get; set; }
        public string Specifications { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public decimal ShippingPrice { get; set; }
    }
}
