using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;

namespace LejlekuXpress.Services
{
    public class BillingInformationService : IBillingInformationService
    {
        private readonly AppDbContext _context;

        public BillingInformationService(AppDbContext context)
        {
            _context = context;
        }

        #region Add

        public async Task<BillingInformation> AddBillingInformation(BillingInformationDTO request)
        {
            try
            {
                BillingInformation billingInformation = new BillingInformation
                {
                    UserId = request.UserId,
                    CardFirstName = request.CardFirstName,
                    CardLastName = request.CardLastName,
                    CardNumber = request.CardNumber,
                    ExpirationDate = request.ExpirationDate,
                    CVV = request.CVV,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CountryId = request.CountryId,
                    State = request.State,
                    City = request.City,
                    ZipCode = request.ZipCode,
                    Address1 = request.Address1,
                    Address2 = request.Address2,
                };

                _context.BillingInformation.Add(billingInformation);
                await _context.SaveChangesAsync();

                return billingInformation;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }

        #endregion

        #region Get

        public async Task<List<BillingInformation>> GetBillingInformation(int userId)
        {
            try
            {
                var billingInformation = _context.BillingInformation
                    .Where(address => address.UserId == userId)
                    .ToList();

                return billingInformation;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }

        #endregion

        #region Delete

        public async Task DeleteBillingInformation(int id)
        {
            try
            {
                var result = _context.BillingInformation.Find(id);
                if (result != null)
                {
                    _context.BillingInformation.Remove(result);
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

        public async Task<BillingInformation> UpdateBillingInformation(int id, BillingInformationDTO request)
        {
            try
            {
                var address = _context.BillingInformation.Find(id);
                if (address != null)
                {
                    address.CardFirstName = request.CardFirstName;
                    address.CardLastName = request.CardLastName;
                    address.CardNumber = request.CardNumber;
                    address.ExpirationDate = request.ExpirationDate;
                    address.CVV = request.CVV;
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
