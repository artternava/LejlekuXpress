using LejlekuXpress.Data;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;

        public CategoryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region GetAll
        public async Task<IEnumerable<Category>> GetAll()
        {
            try
            {
                var result = await _dbContext.Category.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all categories."); ;
            }
        }
        #endregion

        #region GetById
        public async Task<Category> GetCategory(int id)
        {
            try
            {
                var result = _dbContext.Category.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get category.");
            }
        }
        #endregion
    }
}
