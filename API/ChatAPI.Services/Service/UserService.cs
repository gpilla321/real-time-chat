using ChatAPI.Domain.Model;
using ChatAPI.Domain.InputType;
using ChatAPI.Infrastructure.Repository;
using Microsoft.Extensions.Caching.Memory;
using ChatAPI.Services.Helper;

namespace ChatAPI.Services.Service
{
    public interface IUserService
    {
        Task<User> Insert(CreateUserInput newUser);
        Task<User> Get(string id);
        Task<List<User>> Get(List<string> ids);
        Task<List<User>> List(string currentUserId);
        Task<User> GetByUserName(string userName);
    }

    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private readonly IMemoryCache _memoryCache;

        public UserService(IUserRepository userRepository, IMemoryCache memoryCache)
        {
            _userRepository = userRepository;
            _memoryCache = memoryCache;
        }

        public async Task<User> GetByUserName(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                throw new Exception("Username cannot be empty");

            return await _userRepository.GetByUserName(userName);
        }

        public async Task<User> Get(string id)
        {
            return await _userRepository.Get(id);
        }

        public async Task<User> Insert(CreateUserInput newUser)
        {
            var userExists = await GetByUserName(newUser.Username);

            if (userExists != null)
                throw new Exception("User already exists");

            var hash = Hasher.Hash(newUser.Password);

            var user = new User()
            {
                Username = newUser.Username,
                Name = newUser.Name,
                Password = hash.Item2,
                Salt = hash.Item1
            };

            var insertedUser = await _userRepository.Insert(user);

            if (!string.IsNullOrEmpty(insertedUser.Id))
            {
                _memoryCache.Remove("users");
            }

            return insertedUser;
        }

        public async Task<List<User>> List(string currentUserId)
        {
            _memoryCache.TryGetValue("users", out List<User> cachedUsers);

            if (cachedUsers == null)
            {
                var users = await _userRepository.List();
                _memoryCache.Set("users", users, TimeSpan.FromMinutes(30));

                return users.Where(_ => _.Id != currentUserId).ToList();
            }

            return cachedUsers;
        }

        public async Task<List<User>> Get(List<string> ids)
        {
            _memoryCache.TryGetValue("users", out List<User> cachedUsers);

            if (cachedUsers == null)
            {
                var users = await _userRepository.Get(ids);

                return users.Where(_ => ids.Contains(_.Id)).ToList();

            }
            return cachedUsers.Where(_ => ids.Contains(_.Id)).ToList();
        }
    }
}