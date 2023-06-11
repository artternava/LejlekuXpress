using LejlekuXpress.Data;

namespace LejlekuXpress.Services
{
    public class OrdersService
    {
        private readonly AppDbContext _context;

        public OrdersService(AppDbContext context)
        {
            _context = context;
        }
    }
}
