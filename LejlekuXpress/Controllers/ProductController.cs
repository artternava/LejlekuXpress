using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace LejlekuXpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        public ProductController(IProductService service)
        {
            _service = service;
        }

        #region Add
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct(ProductDTO request)
        {
            try
            {
                var product = await _service.AddProduct(request);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Get
        [HttpGet("get")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                var result = await _service.GetProduct(id);
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
                var result = _service.DeleteProduct(id);
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
        public async Task<IActionResult> Update(int id, ProductDTO request)
        {
            try
            {
                var result = _service.UpdateProduct(id, request);
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

        #region GetByUserId
        [HttpGet("getByOwnerId")]
        public async Task<IActionResult> GetShippingAddress(int ownerId)
        {
            try
            {
                var result = await _service.GetProductByUserId(ownerId);
                if (result == null || result.Count == 0)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Update
        [HttpPut("updateIsApproved")]
        public async Task<IActionResult> UpdateIsApproved(int id, bool isApproved, bool isReviewed)
        {
            try
            {
                var result = await _service.UpdateProductIsApproved(id, isApproved, isReviewed);
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
    }
}
