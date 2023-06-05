using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IProductService
    {
        Task<Product> AddProduct(ProductDTO request);
        Task<Product> GetProduct(int id);
        Task DeleteProduct(int id);
        Task<Product> UpdateProduct(int id, ProductDTO request);
        Task<IEnumerable<Product>> GetAll();
        Task<List<Product>> GetProductByUserId(int ownerId);
        Task<Product> UpdateProductIsApproved(int id);
        Task<IEnumerable<Product>> GetAllWhereNotApproved();
        Task<IEnumerable<Product>> GetAllWhereApprovedAndNameLike(string searchQuery);
        Task<IEnumerable<Product>> GetRandomSix();
    }
}
