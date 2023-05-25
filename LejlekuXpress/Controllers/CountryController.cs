using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _service;
        public CountryController(ICountryService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCountry(CountryDTO request)
        {
            try
            {
                var country = await _service.AddCountry(request);
                return Ok(country);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetCountry (int id)
        {
            try
            {
                var result = await _service.GetCountry(id);
                if (result == null)
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
                var result = _service.DeleteCountry(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, CountryDTO request)
        {
            try
            {
                var result = _service.UpdateCountry(id, request);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _service.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
