using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;

        public UserService(AppDbContext context)
        {
            _dbContext = context;
        }
        #region GetUser
        public async Task<User> GetUser(int id)
        {
            try
            {
                var result = _dbContext.User.Find(id);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region DeleteUser
        public async Task DeleteUser(int id)
        {
            try
            {
                var result = _dbContext.User.Find(id);
                if (result != null)
                {
                    _dbContext.User.Remove(result);
                    _dbContext.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region UpdateUser
        public async Task<User> UpdateUser(int id, UserDTO request)
        {
            try
            {
                var user = _dbContext.User.Find(id);
                if (user != null)
                {
                    user.FirstName = request.FirstName;
                    user.LastName = request.LastName;
                    user.Email = request.Email;
                    user.PhoneNumber = request.PhoneNumber;
                    user.ProfilePicture = request.ProfilePicture;
                    //user.RoleId = request.RoleId;

                    _dbContext.SaveChanges();
                }
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

        #region GetAll
        public async Task<IEnumerable<User>> GetAll()
        {
            try
            {
                var result = await _dbContext.User.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

        #region MakeMod
        public async Task<User> MakeMod(int id)
        {
            try
            {
                var user = _dbContext.User.Find(id);
                if (user != null)
                {
                    user.RoleId = 2;

                    _dbContext.SaveChanges();
                }
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

    }
}
