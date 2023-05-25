using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data;
using LejlekuXpress.Models;
using LejlekuXpress.Data.ServiceInterfaces;

namespace LejlekuXpress.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        #region Add
        public async Task<Payment> AddPayment(PaymentDTO request)
        {
            try
            {
                Payment Payment = new Payment
                {
                    UserID = request.UserID,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CardNumber = request.CardNumber,
                    ExpirationDate = request.ExpirationDate,
                    CVV = request.CVV
                    
                };

                _context.Payment.Add(Payment);
                await _context.SaveChangesAsync();

                return Payment;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save your payment details.");
            }
        }
        #endregion

        #region Get

        public async Task<List<Payment>> GetPayment(int userId)
        {
            try
            {
                var payment = _context.Payment
                    .Where(payment => payment.UserID == userId)
                    .ToList();

                return payment;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save your payment details.");
            }
        }

        #endregion

        #region Delete

        public async Task DeletePayment(int id)
        {
            try
            {
                var result = _context.Payment.Find(id);
                if (result != null)
                {
                    _context.Payment.Remove(result);
                    _context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save your payment details.");
            }
        }

        #endregion

        #region Update

        public async Task<Payment> UpdatePayment(int id, PaymentDTO request)
        {
            try
            {
                var payment = _context.Payment.Find(id);
                if (payment != null)
                {
                    payment.FirstName = request.FirstName;
                    payment.LastName = request.LastName;
                    payment.CardNumber = request.CardNumber;
                    payment.ExpirationDate = request.ExpirationDate;    
                    payment.CVV = request.CVV; 
                    

                    _context.SaveChanges();
                }
                return payment;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save your payment details.");
            }
        }

        #endregion
    }
}
