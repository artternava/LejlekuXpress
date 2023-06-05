using LejlekuXpress.Data;

namespace LejlekuXpress.Services
{
    public class WishlistService
    {
        private readonly AppDbContext _context;

        public WishlistService(AppDbContext context)
        {
            _context = context;
        }

    }
}
