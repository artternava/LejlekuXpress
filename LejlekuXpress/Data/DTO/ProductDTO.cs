using LejlekuXpress.Models;
using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class ProductDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Option1 { get; set; }
        public string? Option2 { get; set; }
        public string? Option3 { get; set; }
        public string? Option4 { get; set; }
        public string? Option5 { get; set; }
        public byte[] Images { get; set; }
        public string Description { get; set; }
    }
}
