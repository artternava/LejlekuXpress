using LejlekuXpress.Data;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class RolesService : IRolesService
    {
        private readonly AppDbContext _context;
        public RolesService(AppDbContext context)
        {
            _context = context;
        }

        #region GetAll
        public async Task<IEnumerable<Roles>> GetAll()
        {
            try
            {
                var result = await _context.Roles.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

        #region GetById
        public async Task<Roles> GetRole(int id)
        {
            try
            {
                var result = _context.Roles.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the category name.");
            }
        }
        #endregion
    }
}
