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
    }

    public class ChannelService : IChannelService
    {
        private readonly IChannelRepository _channelRepository;

        public ChannelService(IChannelRepository channelRepository)
        {
            _channelRepository = channelRepository;
        }

        public Task<Channel> Get(string channelId)
        {
            throw new NotImplementedException();
        }

        public Task<Channel> Insert(CreateChannelInput input)
        {
            var channel = new Channel()
            {
                UsersId = new List<string>() { input.From, input.To },
                CreatedAt = DateTime.Now
            };

            return _channelRepository.Insert(channel);
        }

        public Task<List<Channel>> List(string userId)
        {
            return _channelRepository.List(userId);
        }
    }
}
