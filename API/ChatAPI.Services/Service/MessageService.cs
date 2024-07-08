using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Infrastructure.Repository;

namespace ChatAPI.Services.Service
{
    public interface IMessageService
    {
        Task SendMessage(SendMessageInput input);
        Task<List<Message>> GetMessages(string channelId);
    }

    public class MessageService : IMessageService
    {
        private IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public Task<List<Message>> GetMessages(string channelId)
        {
            return _messageRepository.GetMessages(channelId);
        }

        public async Task SendMessage(SendMessageInput input)
        {
            await _messageRepository.SendMessage(new Domain.Model.Message()
            {
                ChannelId = input.ChannelId,
                Content = input.Content,
                From = input.From,
                To = input.To
            });
        }
    }
}
