using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data;
using LejlekuXpress.Models;
using LejlekuXpress.Data.ServiceInterfaces;

namespace LejlekuXpress.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        #region AddItem
        public async Task<Cart> AddItem(CartDTO request)
        {
            try
            {
                Cart cart = new Cart
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                };

                _context.Cart.Add(cart);
                await _context.SaveChangesAsync();

                return cart;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the cart record.");
            }
        }
        #endregion

        #region GeyByUserId
        public async Task<List<Cart>> GetByUserId(int userId)
        {
            try
            {
                var cart = _context.Cart
                    .Where(cart => cart.UserId == userId)
                    .ToList();

                return cart;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the Cart records.");
            }
        }
        #endregion

        #region DeleteItem
        public async Task DeleteItem(int id)
        {
            try
            {
                var result = _context.Cart.Find(id);
                if (result != null)
                {
                    _context.Cart.Remove(result);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to delete the cart record.");
            }
        }
        #endregion

    }
}

