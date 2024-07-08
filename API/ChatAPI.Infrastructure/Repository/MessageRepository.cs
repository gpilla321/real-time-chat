using ChatAPI.Domain.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IMessageRepository
    {
        Task SendMessage(Message message);
    }

    public class MessageRepository : IMessageRepository
    {
        private readonly IMongoCollection<Message> _collection;

        public MessageRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Message>("Message");
        }

        public async Task SendMessage(Message message)
        {
            message.Timestamp = DateTime.Now;
            message.Id = Guid.NewGuid().ToString();

            await _collection.InsertOneAsync(message);
        }
    }
}
