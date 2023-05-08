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
        public async Task<User> Register(UserRegistrationDTO request)
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

        public async Task Logout(string userId)
        {
            var user = await _dbContext.User.FindAsync(userId);
            if (user == null) throw new ArgumentException("User does not exist");

            // Update user's RefreshToken
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(-1); 
            await _dbContext.SaveChangesAsync();
        }


        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString())
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

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyingPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(hash);
            }
        }
    }
}
