using ChatAPI.Domain.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IChannelRepository
    {
        Task<Channel> Insert(Channel channel);
        Task<List<Channel>> List(string userId);
        Task<Channel> Get(string channelId);
        Task<Channel> Exists(List<string> userIds);
    }

    public class ChannelRepository : IChannelRepository
    {
        private readonly IMongoCollection<Channel> _collection;

        public ChannelRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Channel>("Channel");
        }

        public async Task<Channel> Exists(List<string> userIds)
        {
            var result = await _collection.Find(_ => _.UsersId.All(id => userIds.Contains(id))).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Channel> Get(string channelId)
        {
            var result = await _collection.FindAsync(_ => _.Id == channelId);

            return result.FirstOrDefault();
        }

        public async Task<Channel> Insert(Channel channel)
        {
            await _collection.InsertOneAsync(channel);

            return channel;
        }

        public async Task<List<Channel>> List(string userId)
        {
            var result = await _collection.FindAsync(_ => _.UsersId.Contains(userId));

            return result.ToList();
        }
    }
}
