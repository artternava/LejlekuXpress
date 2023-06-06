using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICheckOutService
    {
        Task<CheckOut> AddItem(CheckOutDTO request);
    }
}
