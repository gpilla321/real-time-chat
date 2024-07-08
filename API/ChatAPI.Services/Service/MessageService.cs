using ChatAPI.Domain.Model.InputType;
using ChatAPI.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Services.Service
{
    public interface IMessageService
    {
        Task SendMessage(SendMessageInput input);
    }

    public class MessageService : IMessageService
    {
        private IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
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
