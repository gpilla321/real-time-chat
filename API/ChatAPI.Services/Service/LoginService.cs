using ChatAPI.Domain.DTO;
using ChatAPI.Services.Helper;

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
            var user = await _userService.GetByUserName(login.Username);

            if (user == null)
                throw new Exception("Invalid username or password");

            var hashedPassword = Hasher.Hash(login.Password, user.Salt);

            if (user.Password != hashedPassword.Item2)
                throw new Exception("Invalid username or password");

            var jwt = Auth.GenerateJwt(login.Username);

            return new LoggedInDTO()
            {
                Token = jwt,
                Username = user.Username,
                Name = user.Name,
                UserId = user.Id
            };
        }
    }
}
