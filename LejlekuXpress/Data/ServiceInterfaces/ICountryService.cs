using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICountryService
    {
        Task<Country> AddCountry(CountryDTO request);

        Task<Country> GetCountry(int id);

        Task DeleteCountry(int id);

        Task<Country> UpdateCountry(int id, CountryDTO request);

        Task<IEnumerable<Country>> GetAll();
    }
}
