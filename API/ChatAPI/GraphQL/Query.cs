using ChatAPI.Domain.Model;
using ChatAPI.Services.Service;

namespace ChatAPI.GraphQL
{
    public class Query
    {
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;
        private readonly IChannelService _channelService;
        public Query(IUserService userService, IChannelService channelService, IMessageService messageService)
        {
            _userService = userService;
            _channelService = channelService;
            _messageService = messageService;
        }

        public User GetUser(string username)
        {
            return _userService.Get(username);
        }

        public async Task<List<Message>> GetMessages(string channelId)
        {
            return await _messageService.GetMessages(channelId);
        }
    }
}
