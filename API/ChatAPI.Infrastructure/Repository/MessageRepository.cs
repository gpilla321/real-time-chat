using ChatAPI.Domain.Model;
using MongoDB.Driver;
using System.Linq;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IMessageRepository
    {
        Task SendMessage(Message message);
        Task<List<Message>> GetMessages(string channelId);
        Task<List<Message>> UnviewedMessagesByChannel(List<string> channelsId, string userId);
        Task SetMessageViewed(List<string> messageIds, string userId);
    }

    public class MessageRepository : IMessageRepository
    {
        private readonly IMongoCollection<Message> _collection;

        public MessageRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Message>("Message");
        }

        public async Task<List<Message>> GetMessages(string channelId)
        {
            var result = await _collection.FindAsync(_ => _.ChannelId == channelId);

            return result.ToList();
        }

        public async Task SendMessage(Message message)
        {
            message.Timestamp = DateTime.Now;

            await _collection.InsertOneAsync(message);
        }

        public async Task SetMessageViewed(List<string> messageIds, string userId)
        {
            var result = await _collection
                    .UpdateManyAsync(_ => messageIds.Contains(_.Id), 
                    Builders<Message>.Update.AddToSet(_ => _.ViewedBy, userId));
        }

        public async Task<List<Message>> UnviewedMessagesByChannel(List<string> channelsId, string userId)
        {
            var result =
                await _collection.FindAsync(_ => channelsId.Contains(_.ChannelId) && !_.ViewedBy.Contains(userId));

            return result.ToList();
        }
    }
}
