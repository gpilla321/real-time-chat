using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Services.Service;

namespace ChatAPI.GraphQL
{
    public class Mutation
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;
        private readonly IChannelService _channelService;

        public Mutation(IUserService userService, IMessageService messageService, IChannelService channelService)
        {
            _userService = userService;
            _messageService = messageService;
            _channelService = channelService;
        }

        public async Task<User> CreateUser(CreateUserInput newUser)
        {
            return await _userService.Insert(newUser);
        }
        
        public async Task<bool> SendMessage(SendMessageInput input)
        {
            await _messageService.SendMessage(input);

            return true;
        }

        public async Task<Channel> CreateChannel(CreateChannelInput input)
        {
            return await _channelService.Insert(input);
        }
    }
}
