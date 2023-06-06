using LejlekuXpress.Data.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    public class CheckOutController : Controller
    {
        private readonly ICheckOutService _service;
        public CheckOutController(ICheckOutService service)
        {
            _service = service;
        }
    }
}
