using LejlekuXpress.Data;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class CountryService : ICountryService
    {
        private readonly AppDbContext _dbContext;

        public CountryService(AppDbContext context)
        {
            _dbContext = context;
        }

        public async Task<Country> AddCountry (Country country)
        {
            try
            {
                Country addCountry = new Country
                {
                    Iso = country.Iso,
                    Name = country.Name,
                    NiceName = country.NiceName,
                    Iso3 = country.Iso3,
                    NumCode = country.NumCode,
                    PhoneCode = country.PhoneCode,
                };

                _dbContext.Country.Add (addCountry);
                await _dbContext.SaveChangesAsync();

                return addCountry;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }

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
        public async Task<Country> UpdateCountry(int id, Country country)
        {
            try
            {
                var existingCountry = _dbContext.Country.Find(id);
                if (existingCountry != null)
                {
                    existingCountry.Iso = country.Iso;
                    existingCountry.Name = country.Name;
                    existingCountry.NiceName = country.NiceName;
                    existingCountry.Iso3 = country.Iso3;
                    existingCountry.NumCode = country.NumCode;
                    existingCountry.PhoneCode = country.PhoneCode;

                    _dbContext.SaveChanges();
                }
                return existingCountry;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }

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
    }
}
