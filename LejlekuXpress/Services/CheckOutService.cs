using LejlekuXpress.Data;

namespace LejlekuXpress.Services
{
    public class CheckOutService
    {
        private readonly AppDbContext _context;

        public CheckOutService(AppDbContext context)
        {
            _context = context;
        }


    }
}
