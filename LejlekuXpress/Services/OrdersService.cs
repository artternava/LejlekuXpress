using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class OrdersService : IOrdersService
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

                Orders orders = new Orders
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    EnteredOn = DateTime.Now,
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

        #region DeleteItem
        public async Task DeleteItem(int id)
        {
            try
            {
                var result = _context.Orders.Find(id);
                if (result != null)
                {
                    _context.Orders.Remove(result);
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

        #region UpdateItem
        public async Task<Orders> UpdateItem(int id, OrdersDTO request)
        {
            try
            {
                var orders = _context.Orders.Find(id);
                if (orders != null)
                {
                    orders.UserId = request.UserId;
                    orders.ProductId = request.ProductId;
                    orders.Quantity = request.Quantity;

                    _context.SaveChanges();
                }
                return orders;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to update the order."); ;
            }
        }
        #endregion
    }
}
