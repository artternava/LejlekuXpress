using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IWishlistService
    {
        Task<Wishlist> AddItem(WishlistDTO request);

        Task<List<Wishlist>> GetByUserId(int userId);

        Task DeleteItem(int id);
    }
}
