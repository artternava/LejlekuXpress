using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShabllonController : ControllerBase
    {
        private readonly IShabllonService _service;
        public ShabllonController(IShabllonService service)
        {
            _service = service;
        }
        #region Add
        [HttpPost("add")]
        public async Task<IActionResult> Add(ShabllonDTO request)
        {
            try
            {
                var result = await _service.Add(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Get
        [HttpGet("get")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _service.Get(id);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Delete
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = _service.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Update
        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, ShabllonDTO request)
        {
            try
            {
                var result = _service.Update(id, request);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region GetAll
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
        #endregion
    }
}
