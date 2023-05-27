using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IBillingInformationService
    {
        Task<BillingInformation> AddBillingInformation(BillingInformationDTO request);

        Task<List<BillingInformation>> GetBillingInformation(int userId);

        Task DeleteBillingInformation(int id);

        Task<BillingInformation> UpdateBillingInformation(int id, BillingInformationDTO request);
    }
}
