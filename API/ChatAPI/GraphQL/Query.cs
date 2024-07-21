using ChatAPI.Domain;
using ChatAPI.Domain.DTO;
using ChatAPI.Domain.Model;
using ChatAPI.Services.Service;
using HotChocolate.Authorization;
using Microsoft.Extensions.Caching.Memory;

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

        [Authorize]
        public async Task<User> GetUser(string username)
        {
            return await _userService.Get(username);
        }

        [Authorize]
        public async Task<List<User>> ListUsers()
        {
            return await _userService.List();
        }

        [Authorize]
        public async Task<List<UserMessageDTO>> GetMessages(string channelId)
        {
            var messages = await _messageService.GetMessages(channelId);

            return messages;
        }

        [Authorize]
        public async Task<List<ViewByByChannelDTO>> ChannelViewedBy(string userId)
        {
            return await _channelService.UnviewedMessagesByChannel(userId);
        }

        [Authorize]
        public async Task<List<Channel>> ListChannels(string userId)
        {
            return await _channelService.List(userId);
        }

        [Authorize]
        public async Task<OperationResultDTO<User>> UserExists(string userName)
        {
            var user = await _userService.GetByUserName(userName);

            return new OperationResultDTO<User>()
            {
                Success = user != null
            };
        }
    }
}
