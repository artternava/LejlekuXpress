using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Services
{
    public class CheckOutService
    {
        private readonly AppDbContext _context;

        public CheckOutService(AppDbContext context)
        {
            _context = context;
        }

        #region AddItem
        public async Task<CheckOut> AddItem(CheckOutDTO request)
        {
            try
            {
                var product = await _context.Product.FindAsync(request.ProductId);

                product.Quantity -= request.Quantity;

                CheckOut checkOut = new CheckOut
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                };

                _context.CheckOut.Add(checkOut);
                await _context.SaveChangesAsync();

                return checkOut;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the cart record.");
            }
        }
        #endregion

        #region GeyByUserId
        public async Task<List<CheckOut>> GetByUserId(int userId)
        {
            try
            {
                var checkOut = _context.CheckOut
                    .Where(checkOut => checkOut.UserId == userId)
                    .ToList();

                return checkOut;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the Cart records.");
            }
        }
        #endregion
    }
}
