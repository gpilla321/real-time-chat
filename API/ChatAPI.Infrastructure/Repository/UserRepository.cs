
using ChatAPI.Domain.Model;
using MongoDB.Driver;

namespace ChatAPI.Infrastructure.Repository
{
    public interface IUserRepository
    {
        User Insert(User input);
        User Get(string userName);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<User>("User");
        }

        public User Get(string userName)
        {
            return _collection.Find(_ => _.Username == userName).First();
        }

        public User Insert(User newUser)
        {
            newUser.Id = Guid.NewGuid().ToString();
            _collection.InsertOne(newUser);

            return newUser;
        }
    }
}
