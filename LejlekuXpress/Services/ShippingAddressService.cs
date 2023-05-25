using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;

namespace LejlekuXpress.Services
{
    public class ShippingAddressService : IShippingAddressService
    {
        private readonly AppDbContext _context;

        public ShippingAddressService(AppDbContext context)
        {
            _context = context;
        }

        #region Add
        public async Task<ShippingAddress> AddShippingAddress (ShippingAddressDTO request)
        {
            try
            {
                ShippingAddress shippingAddress = new ShippingAddress
                {
                    UserId = request.UserID,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CountryId = request.CountryId,
                    State = request.State,
                    City = request.City,
                    ZipCode = request.ZipCode,
                    Address1 = request.Address1,
                    Address2 = request.Address2,
                };

                _context.ShippingAddress.Add(shippingAddress);
                await _context.SaveChangesAsync();

                return shippingAddress;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }
        #endregion

        #region Get

        public async Task<List<ShippingAddress>> GetShippingAddress (int userId)
        {
            try
            {
                var shippingAddresses = _context.ShippingAddress
                    .Where(address => address.UserId == userId)
                    .ToList();

                return shippingAddresses;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }

        #endregion

        #region Delete

        public async Task DeleteShippingAddress(int id)
        {
            try
            {
                var result = _context.ShippingAddress.Find(id);
                if (result != null)
                {
                    _context.ShippingAddress.Remove(result);
                    _context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }

        #endregion

        #region Update

        public async Task<ShippingAddress> UpdateShippingAddress(int id, ShippingAddressDTO request)
        {
            try
            {
                var address = _context.ShippingAddress.Find(id);
                if (address != null)
                {
                    address.FirstName = request.FirstName;
                    address.LastName = request.LastName;
                    address.CountryId = request.CountryId;
                    address.State = request.State;
                    address.City = request.City;
                    address.ZipCode = request.ZipCode;
                    address.Address1 = request.Address1;
                    address.Address2 = request.Address2;

                    _context.SaveChanges();
                }
                return address;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }

        #endregion
    }
}
