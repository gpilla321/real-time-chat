using ChatAPI.Domain.DTO;
using ChatAPI.Services.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Services.Service
{
    public interface ILoginService
    {
        Task<LoggedInDTO> Login(LoginDTO login);
    }
    public class LoginService : ILoginService
    {

        private readonly IUserService _userService;

        public LoginService(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<LoggedInDTO> Login(LoginDTO login)
        {
            var user = await _userService.GetByUserName(login.UserName);

            if (user == null)
                throw new Exception("User not found");

            var hashedPassword = Hasher.Hash(login.Password, user.Salt);

            if (user.Password != hashedPassword.Item2)
                throw new Exception("Invalid password");

            var jwt = Auth.GenerateJwt(login.UserName);

            return new LoggedInDTO()
            {
                Token = jwt,
                UserName = login.UserName
            };
        }
    }
}
