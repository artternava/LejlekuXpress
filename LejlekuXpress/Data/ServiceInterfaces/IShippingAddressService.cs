using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IShippingAddressService
    {
        Task<ShippingAddress> AddShippingAddress(ShippingAddressDTO request);

        Task<List<ShippingAddress>> GetShippingAddress(int userId);

        Task DeleteShippingAddress(int id);

        Task<ShippingAddress> UpdateShippingAddress(int id, ShippingAddressDTO request);
    }
}
