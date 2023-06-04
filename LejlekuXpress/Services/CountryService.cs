using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class CountryService : ICountryService
    {
        private readonly AppDbContext _dbContext;

        public CountryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region AddCountry

        //NotNeeded
        public async Task<Country> AddCountry(CountryDTO request)
        {
            try
            {
                Country country = new Country
                {
                    Iso = request.Iso,
                    Name = request.Name,
                    NiceName = request.NiceName,
                    Iso3 = request.Iso3,
                    NumCode = request.NumCode,
                    PhoneCode = request.PhoneCode
                };

                _dbContext.Country.Add(country);
                await _dbContext.SaveChangesAsync();

                return country;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the country record.");
            }
        }
        #endregion

        #region GetCountry
        public async Task<Country> GetCountry(int id)
        {
            try
            {
                var result = _dbContext.Country.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region DeleteCountry

        //NotNeeded
        public async Task DeleteCountry (int id) 
        {
            try
            {
                var result = _dbContext.Country.Find(id);
                if (result != null)
                {
                    _dbContext.Country.Remove(result);
                    _dbContext.SaveChanges();
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region UpdateCountry
        //NotNeeded
        public async Task<Country> UpdateCountry(int id, CountryDTO request)
        {
            try
            {
                var country = _dbContext.Country.Find(id);
                if (country != null)
                {
                    country.Iso = request.Iso;
                    country.Name = request.Name;
                    country.NiceName = request.NiceName;
                    country.Iso3 = request.Iso3;
                    country.NumCode = request.NumCode;
                    country.PhoneCode = request.PhoneCode;

                    _dbContext.SaveChanges();
                }
                return country;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

        #region GetAll
        public async Task<IEnumerable<Country>> GetAll()
        {
            try
            {
                var result = await _dbContext.Country.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion
    }
}
