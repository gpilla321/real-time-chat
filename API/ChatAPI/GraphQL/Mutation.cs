using ChatAPI.Domain.Model;
using ChatAPI.Domain.Model.InputType;
using ChatAPI.Services.Service;

namespace ChatAPI.GraphQL
{
    public class Mutation
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;

        public Mutation(IUserService userService, IMessageService messageService)
        {
            _userService = userService;
            _messageService = messageService;
        }

        public User CreateUser(CreateUserInput newUser)
        {
            return _userService.Insert(newUser);
        }
        
        public async Task<bool> SendMessage(SendMessageInput input)
        {
            await _messageService.SendMessage(input);
            return true;
        }
    }
}
