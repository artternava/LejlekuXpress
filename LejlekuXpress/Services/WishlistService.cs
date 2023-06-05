using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly AppDbContext _context;

        public WishlistService(AppDbContext context)
        {
            _context = context;
        }

        #region AddItem
        public async Task<Wishlist> AddItem(WishlistDTO request)
        {
            try
            {
                Wishlist wishlist = new Wishlist
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                };

                _context.Wishlist.Add(wishlist);
                await _context.SaveChangesAsync();

                return wishlist;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the wishlist record.");
            }
        }
        #endregion

        #region GeyByUserId
        public async Task<List<Wishlist>> GetByUserId(int userId)
        {
            try
            {
                var wishlist = _context.Wishlist
                    .Where(wishlist => wishlist.UserId == userId)
                    .ToList();

                return wishlist;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the Wishlist records.");
            }
        }
        #endregion

        #region DeleteItem
        public async Task DeleteItem(int id)
        {
            try
            {
                var result = _context.Wishlist.Find(id);
                if (result != null)
                {
                    _context.Wishlist.Remove(result);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to delete the wishlist record.");
            }
        }
        #endregion

    }
}
