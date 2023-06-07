using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICheckOutService
    {
        Task<CheckOut> AddItem(CheckOutDTO request);

        Task<List<CheckOut>> GetByUserId(int userId);

        Task DeleteItem(int id);

        Task DeleteAllItems();
    }
}
