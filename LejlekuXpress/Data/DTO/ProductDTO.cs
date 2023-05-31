using LejlekuXpress.Models;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class ProductDTO
    {
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string OptionType { get; set; }
        public List<ProductOption> Options { get; set; }
        public List<ProductImage> Images { get; set; }
        public List<ProductSpecification> Specifications { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
