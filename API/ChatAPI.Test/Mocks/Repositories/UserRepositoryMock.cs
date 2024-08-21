using ChatAPI.Domain.Model;
using ChatAPI.Infrastructure.Repository;
using Moq;
namespace ChatAPI.Test.Mocks.Repositories
{
    public static class UserRepositoryMock
    {
        public static Mock<IUserRepository> Get()
        {
            var mock = new Mock<IUserRepository>();

            mock.Setup(_ => _.Get(It.IsAny<string>())).ReturnsAsync(new User()
            {
                Id = "1",
                Name = "Test",
                Username = "test",
                Password = "password",
                CreatedAt = DateTime.Now
            });

            mock.Setup(_ => _.Insert(It.IsAny<User>())).ReturnsAsync(new User()
            {
                Id = "1",
                Name = "Test",
                Username = "test",
                Password = "password",
                CreatedAt = DateTime.Now
            });

            mock.Setup(_ => _.List()).ReturnsAsync(new List<User>()
            {
                new User() { Id = "1", Name = "Test", Username = "test", Password = "password", CreatedAt = DateTime.Now },
                new User() { Id = "2", Name = "Test2", Username = "test2", Password = "password", CreatedAt = DateTime.Now },
                new User() { Id = "3", Name = "Test3", Username = "test3", Password = "password", CreatedAt = DateTime.Now }
            });

            return mock;
        }
    }
}
