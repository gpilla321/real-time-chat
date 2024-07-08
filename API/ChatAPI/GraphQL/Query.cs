using ChatAPI.Domain.Model;
using ChatAPI.Services.Service;

namespace ChatAPI.GraphQL
{
    public class Query
    {
        private readonly IUserService _userService;
        public Query(IUserService userService)
        {
            _userService = userService;
        }

        public User GetUser(string username)
        {
            return _userService.Get(username);
        }

    }
}
