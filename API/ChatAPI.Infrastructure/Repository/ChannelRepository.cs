using ChatAPI.Domain.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IChannelRepository
    {
        Task<Channel> Insert(Channel channel);
    }

    public class ChannelRepository : IChannelRepository
    {
        private readonly IMongoCollection<Channel> _collection;

        public ChannelRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Channel>("Channel");
        }

        public async Task<Channel> Insert(Channel channel)
        {
            await _collection.InsertOneAsync(channel);

            return channel;
        }
    }
}
