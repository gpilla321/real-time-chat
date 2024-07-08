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
    }

    public class ChannelService : IChannelService
    {
        private readonly IChannelRepository _channelRepository;

        public ChannelService(IChannelRepository channelRepository)
        {
            _channelRepository = channelRepository;
        }

        public Task<Channel> Insert(CreateChannelInput input)
        {
            var channel = new Channel()
            {
                From = input.From,
                To = input.To,
                CreatedAt = DateTime.Now
            };

            return _channelRepository.Insert(channel);
        }
    }
}
