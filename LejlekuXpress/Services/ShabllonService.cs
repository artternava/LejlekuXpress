using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;
using LejlekuXpress.Data.ServiceInterfaces;

namespace LejlekuXpress.Services
{
    public class ShabllonService : IShabllonService
    {
        private readonly AppDbContext _context;

        public ShabllonService(AppDbContext context)
        {
            _context = context;
        }

        #region Add
        public async Task<Shabllon> Add(ShabllonDTO request)
        {
            try
            {
                Shabllon shabllon = new Shabllon
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    //... vazhdojn vlerat
                };

                _context.Shabllon.Add(shabllon);
                await _context.SaveChangesAsync();

                return shabllon;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the Shabllon record.");
            }
        }
        #endregion

        #region Get
        public async Task<Shabllon> Get(int id)
        {
            try
            {
                var result = _context.Shabllon.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to find the Shabllon record.");
            }
        }
        #endregion

        #region Delete
        public async Task Delete(int id)
        {
            try
            {
                var result = _context.Shabllon.Find(id);
                if (result != null)
                {
                    _context.Shabllon.Remove(result);
                    _context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to delete the Lojtari record.");
            }
        }
        #endregion

        #region Update
        public async Task<Shabllon> Update(int id, ShabllonDTO request)
        {
            try
            {
                var shabllon = _context.Shabllon.Find(id);
                if (shabllon != null)
                {
                    shabllon.FirstName = request.FirstName;
                    shabllon.LastName = request.LastName;

                    _context.SaveChanges();
                }
                return shabllon;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to update the shabllon record."); ;
            }
        }
        #endregion

        #region GetAll
        public async Task<IEnumerable<Shabllon>> GetAll()
        {
            try
            {
                var result = await _context.Shabllon.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all the Shabllon records."); ;
            }
        }
        #endregion
    }
}
