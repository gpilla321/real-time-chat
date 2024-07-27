using ChatAPI.Domain.DTO;
using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Services.Service
{
    public interface IChannelService
    {
        Task<Channel> Insert(CreateChannelInput input);
        Task<List<Channel>> List(string userId);
        Task<Channel> Get(string channelId);
        Task<List<ViewByByChannelDTO>> UnviewedMessagesByChannel(string userId);
    }

    public class ChannelService : IChannelService
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IMessageRepository _messageRepository;

        public ChannelService(IChannelRepository channelRepository, IMessageRepository messageRepository)
        {
            _channelRepository = channelRepository;
            _messageRepository = messageRepository;
        }

        public async Task<List<ViewByByChannelDTO>> UnviewedMessagesByChannel(string userId)
        {
            var channels = await List(userId);
            if (channels == null) return null;

            var messages = await _messageRepository.UnviewedMessagesByChannel(channels.Select(_ => _.Id).ToList(), userId);
            return messages.GroupBy(_ => _.ChannelId).Select(_ => new ViewByByChannelDTO()
            {
                ChannelId = _.Key,
                Count = _.Count()
            }).ToList();
        }

        public Task<Channel> Get(string channelId)
        {
            return _channelRepository.Get(channelId);
        }

        public async Task<Channel> Insert(CreateChannelInput input)
        {
            var channelExists = await _channelRepository.Exists(new List<string>() { input.From, input.To });

            if (channelExists != null)
                throw new Exception("Channel already exists");

            var channel = new Channel()
            {
                UsersId = new List<string>() { input.From, input.To },
                CreatedAt = DateTime.Now
            };

            return await _channelRepository.Insert(channel);
        }

        public Task<List<Channel>> List(string userId)
        {
            return _channelRepository.List(userId);
        }
    }
}
