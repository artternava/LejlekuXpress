using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingInformationController : ControllerBase
    {
        private readonly IBillingInformationService _service;
        public BillingInformationController(IBillingInformationService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBillingInformation(BillingInformationDTO request)
        {
            try
            {
                var result = await _service.AddBillingInformation(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetBillingInformation(int UserId)
        {
            try
            {
                var result = await _service.GetBillingInformation(UserId);
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
        public async Task<IActionResult> DeleteBillingInformation(int id)
        {
            try
            {
                var result = _service.DeleteBillingInformation(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateBillingInformation(int id, BillingInformationDTO request)
        {
            try
            {
                var result = _service.UpdateBillingInformation(id, request);
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

