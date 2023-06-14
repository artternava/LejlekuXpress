using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IShabllonService
    {
        Task<Shabllon> Add(ShabllonDTO request);
        Task<Shabllon> Get(int id);
        Task Delete(int id);
        Task<Shabllon> Update(int id, ShabllonDTO request);
        Task<IEnumerable<Shabllon>> GetAll();
    }
}
