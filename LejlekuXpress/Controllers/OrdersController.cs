using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _service;

        public OrdersController(IOrdersService service)
        {
            _service = service;
        }

        #region Add
        [HttpPost("add")]
        public async Task<IActionResult> AddItem(OrdersDTO request)
        {
            try
            {
                var product = await _service.AddItem(request);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
