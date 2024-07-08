using ChatAPI.Domain.Model;
using ChatAPI.Domain.InputType;
using ChatAPI.Infrastructure.Repository;

namespace ChatAPI.Services.Service
{
    public interface IUserService
    {
        User Insert(CreateUserInput newUser);
        User Get(string userName);
    }

    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User Get(string userName)
        {
            return _userRepository.Get(userName);
        }

        public User Insert(CreateUserInput newUser)
        {
            var user = new User()
            {
                Username = newUser.Username,
                Name = newUser.Name
            };

            return _userRepository.Insert(user);
        }
    }
}