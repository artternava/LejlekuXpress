using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Migrations;

namespace LejlekuXpress.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        #region Add
        public async Task<Product> AddProduct(ProductDTO request)
        {
            try
            {
                Product product = new Product
                {
                    OwnerId = request.OwnerId,
                    IsApproved = false,
                    Name = request.Name,
                    Quantity = request.Quantity,
                    Image = request.Image,
                    Specifications = request.Specifications,
                    Description = request.Description,
                    Price = request.Price,
                    CategoryId = request.CategoryId,
                    IsReviewed = false,
                    ShippingPrice = request.ShippingPrice,
                };

                _context.Product.Add(product);
                await _context.SaveChangesAsync();

                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the product record.");
            }
        }
        #endregion

        #region GetById
        public async Task<Product> GetProduct(int id)
        {
            try
            {
                var result = _context.Product.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get the product record.");
            }
        }
        #endregion

        #region Delete
        public async Task DeleteProduct(int id)
        {
            try
            {
                var result = _context.Product.Find(id);
                if (result != null)
                {
                    _context.Product.Remove(result);
                    _context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to delete the product record.");
            }
        }
        #endregion

        #region Update
        public async Task<Product> UpdateProduct(int id, ProductDTO request)
        {
            try
            {
                var product = _context.Product.Find(id);
                if (product != null)
                {
                    product.OwnerId = request.OwnerId;
                    product.Name = request.Name;
                    product.Quantity = request.Quantity;
                    product.Image = request.Image;
                    product.Specifications = request.Specifications;
                    product.Description = request.Description;
                    product.Price = (decimal)request.Price;
                    product.ShippingPrice = (decimal)request.ShippingPrice;

                    _context.SaveChanges();
                }
                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to update the product record."); ;
            }
        }
        #endregion

        #region GetAll
        public async Task<IEnumerable<Product>> GetAll()
        {
            try
            {
                var result = await _context.Product.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all the product records."); ;
            }
        }
        #endregion

        #region GetByOwnerId
        public async Task<List<Product>> GetProductByUserId(int ownerId)
        {
            try
            {
                var product = _context.Product
                    .Where(product => product.OwnerId == ownerId)
                    .ToList();

                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the shipping address record.");
            }
        }
        #endregion

        #region UpdateProductStatus
        public async Task<Product> UpdateProductIsApproved(int id)
        {
            try
            {
                var product = _context.Product.Find(id);
                if (product != null)
                {
                    product.IsApproved = true;

                    _context.SaveChanges();
                }
                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to update the product record."); ;
            }
        }
        #endregion

        #region GetAllWhereNotApproved
        public async Task<IEnumerable<Product>> GetAllWhereNotApproved()
        {
            try
            {
                var result = await _context.Product
                           .Where(p => !p.IsApproved)
                           .ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all the product records."); ;
            }
        }
        #endregion

        #region GetAllWhereApprovedAndNameLike
        public async Task<IEnumerable<Product>> GetAllWhereApprovedAndNameLike(string searchQuery)
        {
            try
            {
                var result = await _context.Product
                       .Where(p => p.IsApproved && p.Name.ToLower().Contains(searchQuery.ToLower()))
                       .ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all the product records."); ;
            }
        }
        #endregion

        #region GetRandomSix
        public async Task<IEnumerable<Product>> GetRandomSix()
        {
            try
            {
                var result = await _context.Product
                               .Where(p => p.IsApproved)
                               .OrderBy(p => Guid.NewGuid())
                               .Take(6)
                               .ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to get all the product records.");
            }
        }
        #endregion

    }
}
