using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICountryService
    {
        Task<Country> AddCountry(Country country);

        Task<Country> GetCountry(int id);

        Task DeleteCountry(int id);

        Task<Country> UpdateCountry(int id, Country country);

        Task<IEnumerable<Country>> GetAll();
    }
}
