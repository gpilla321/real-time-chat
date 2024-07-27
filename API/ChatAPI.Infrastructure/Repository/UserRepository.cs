
using ChatAPI.Domain.Model;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IUserRepository
    {
        Task<User> Insert(User input);
        Task<User> Get(string id);
        Task<List<User>> Get(List<string> ids);
        Task<User> GetByUserName(string userName);
        Task<List<User>> List();
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<User>("User");
        }

        public async Task<User> Get(string id)
        {
            var result = await _collection.FindAsync(_ => _.Id == id);

            return result.FirstOrDefault();
        }

        public async Task<List<User>> Get(List<string> ids)
        {
            var result = await _collection.FindAsync(_ => ids.Contains(_.Id));

            return result.ToList();
        }

        public async Task<User> GetByUserName(string userName)
        {
            var result = await _collection.FindAsync(_ => _.Username == userName);

            return result.FirstOrDefault();
        }

        public async Task<User> Insert(User newUser)
        {
            newUser.CreatedAt = DateTime.Now;
            await _collection.InsertOneAsync(newUser);

            return newUser;
        }

        public async Task<List<User>> List()
        {
            var result = await _collection.FindAsync(_ => true);

            return result.ToList();
        }
    }
}
