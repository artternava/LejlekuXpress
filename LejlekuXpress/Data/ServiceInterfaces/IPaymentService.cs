using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IPaymentService
    {
        Task<Payment> AddPayment(PaymentDTO request);
        Task<List<Payment>> GetPayment(int userId);
        Task DeletePayment(int id);
        Task<Payment> UpdatePayment(int id, PaymentDTO request);
    }
}
