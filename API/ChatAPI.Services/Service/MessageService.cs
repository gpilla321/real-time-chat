﻿using ChatAPI.Domain.DTO;
using ChatAPI.Domain.DTO.Subscription;
using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Infrastructure.Repository;
using HotChocolate.Subscriptions;

namespace ChatAPI.Services.Service
{
    public interface IMessageService
    {
        Task SendMessage(SendMessageInput input);
        Task<List<UserMessageDTO>> GetMessages(string channelId);
        Task SetMessageViewed(List<string> messageId, string userId);
    }

    public class MessageService : IMessageService
    {
        private IMessageRepository _messageRepository;
        private readonly IUserService _userService;
        private readonly IChannelService _channelService;
        private readonly ITopicEventSender _topicSender;
        public MessageService(IMessageRepository messageRepository, IUserService userService, IChannelService channelService, ITopicEventSender topicSender)
        {
            _messageRepository = messageRepository;
            _userService = userService;
            _channelService = channelService;
            _topicSender = topicSender;
        }

        public async Task<List<UserMessageDTO>> GetMessages(string channelId)
        {
            var channel = await _channelService.Get(channelId);
            if (channel == null)
                throw new Exception("Channel not found");

            var messages = await _messageRepository.GetMessages(channelId);
            var users = await _userService.Get(channel.UsersId);

            var userMessages = messages.ToList().Select(_ => new UserMessageDTO()
            {
                Id = _.Id,
                From = users?.Where(u => u.Id == _.From).FirstOrDefault(),
                To = users?.Where(u => u.Id == _.To).FirstOrDefault(),
                Timestamp = _.Timestamp,
                Content = _.Content,
                ViewedBy = _.ViewedBy
            }).ToList();

            return userMessages;
        }

        public async Task SendMessage(SendMessageInput input)
        {
            var userFrom = await _userService.Get(input.From);
            if (userFrom == null) throw new Exception("From user not found");

            var userTo = await _userService.Get(input.To);
            if (userTo == null) throw new Exception("To user not found");

            if (string.IsNullOrEmpty(input.ChannelId))
            {
                var channel = await _channelService.Insert(new CreateChannelInput()
                {
                    From = input.From,
                    To = input.To,
                });
                input.ChannelId = channel.Id;
            }

            var message = new Message()
            {
                ChannelId = input.ChannelId,
                Content = input.Content,
                From = input.From,
                To = input.To,
                ClientUID = input.ClientUID,
                ViewedBy = new List<string>() { input.From },

            };

            await _messageRepository.SendMessage(message);
            await _topicSender.SendAsync(input.ChannelId, message);
            await _topicSender.SendAsync(input.To, new NewMessageDTO()
            {
                ChannelId = input.ChannelId,
                Message = input.Content,
                From = userFrom.Name
            });
        }

        public async Task SetMessageViewed(List<string> messageId, string userId)
        {
            await _messageRepository.SetMessageViewed(messageId, userId);
        }
    }
}
