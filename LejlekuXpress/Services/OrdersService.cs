using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Services
{
    public class OrdersService
    {
        private readonly AppDbContext _context;

        public OrdersService(AppDbContext context)
        {
            _context = context;
        }
        #region AddItem
        public async Task<Orders> AddItem(OrdersDTO request)
        {
            try
            {
                var product = await _context.Product.FindAsync(request.ProductId);

                product.Quantity -= request.Quantity;

                if (product.Quantity <= 0)
                {
                    _context.Product.Remove(product);
                }

                Orders orders = new Orders
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                };

                _context.Orders.Add(orders);
                await _context.SaveChangesAsync();

                return orders;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the order.");
            }
        }
        #endregion

        #region GeyByUserId
        public async Task<List<Orders>> GetByUserId(int userId)
        {
            try
            {
                var orders = _context.Orders
                    .Where(orders => orders.UserId == userId)
                    .ToList();

                return orders;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the orders.");
            }
        }
        #endregion



    }
}
