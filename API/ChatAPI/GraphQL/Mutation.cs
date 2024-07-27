using ChatAPI.Domain;
using ChatAPI.Domain.DTO;
using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Services.Service;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ChatAPI.GraphQL
{
    public class Mutation
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;
        private readonly IChannelService _channelService;
        private readonly ILoginService _userLogin;

        public Mutation(IUserService userService, IMessageService messageService, IChannelService channelService, ILoginService userLogin)
        {
            _userService = userService;
            _messageService = messageService;
            _channelService = channelService;
            _userLogin = userLogin;
        }

        public async Task<OperationResultDTO<bool>> CreateUser(CreateUserInput input)
        {
            var user = await _userService.Insert(input);

            return new OperationResultDTO<bool>()
            {
                Success = user != null
            };
        }

        [Authorize]
        public async Task<bool> SendMessage(SendMessageInput input)
        {
            await _messageService.SendMessage(input);

            return true;
        }

        [Authorize]
        public async Task<OperationResultDTO<Channel>> CreateChannel(CreateChannelInput input)
        {
            var channel = await _channelService.Insert(input);

            return new OperationResultDTO<Channel>()
            {
                Success = channel != null,
                Data = channel
            };
        }

        public async Task<OperationResultDTO<LoggedInDTO>> Login(LoginDTO input)
        {
            var loggedIn = await _userLogin.Login(input);

            return new OperationResultDTO<LoggedInDTO>()
            {
                Success = loggedIn != null,
                Data = loggedIn
            };
        }

        [Authorize]
        public async Task<bool> SetMessageViewed(List<string> messageIds, string userId)
        {
            await _messageService.SetMessageViewed(messageIds, userId);

            return true;
        }
    }
}
