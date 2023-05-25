using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingAddressController : ControllerBase
    {
        private readonly IShippingAddressService _service;
        public ShippingAddressController(IShippingAddressService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddShippingAddress(ShippingAddressDTO request)
        {
            try
            {
                var shippingAddress = await _service.AddShippingAddress(request);
                return Ok(shippingAddress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetShippingAddress(int UserId)
        {
            try
            {
                var result = await _service.GetShippingAddress(UserId);
                if (result == null || result.Count == 0)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = _service.DeleteShippingAddress(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, ShippingAddressDTO request)
        {
            try
            {
                var result = _service.UpdateShippingAddress(id, request);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
