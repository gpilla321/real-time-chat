using ChatAPI.Domain.Model;
using MongoDB.Driver;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IMessageRepository
    {
        Task SendMessage(Message message);
        Task<List<Message>> GetMessages(string channelId);
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
    }
}
