using LejlekuXpress.Data;
using LejlekuXpress.Data.DTO;
using LejlekuXpress.Data.ServiceInterfaces;
using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LejlekuXpress.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _dbContext = context;   
            _configuration = configuration;
        }

        #region Register
        public async Task<User> Register(UserRegistrationDTO request)
        {
            try
            {
                CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

                User user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    RoleId = request.Role
                };

                _dbContext.User.Add(user);
                await _dbContext.SaveChangesAsync();

                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region Login
        public async Task<string> Login(UserLoginDTO request)
        {
            User user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return null;

            if (!VerifyingPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return null;

            string token = CreateToken(user);

            return token;
        }
        #endregion

        #region ChangePassword
        public async Task<User> ChangePassword(int id, ChangePasswordDTO request)
        {
            try
            {
                CreatePasswordHash(request.NewPassword, out byte[] hash, out byte[] salt); 

                var user = _dbContext.User.Find(id);
                if (user != null)
                {
                    if (!VerifyingPasswordHash(request.OldPassword, user.PasswordHash, user.PasswordSalt))
                        return null;

                    user.PasswordHash = hash;
                    user.PasswordSalt = salt;

                    await _dbContext.SaveChangesAsync();
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

        #region CreateToken
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:JwtSecretKey").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        #endregion

        #region CreatePasswordHash
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
        #endregion

        #region VerifyingPasswordHash
        private bool VerifyingPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(hash);
            }
        }
        #endregion
    }
}
