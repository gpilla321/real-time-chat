using BCrypt.Net;
using ChatAPI.Domain.InputType;
using ChatAPI.Domain.Model;
using ChatAPI.Services.Helper;
using ChatAPI.Services.Service;
using Moq;
using System.Security.Cryptography;
using System.Text;

namespace ChatAPI.Test.Mocks.Services
{
    public static class UserServiceMock
    {
        public static byte[] _salt = RandomNumberGenerator.GetBytes(128 / 8);

        public static Mock<IUserService> Get()
        {
            var moq = new Mock<IUserService>();

            var hashedPassword = Hasher.Hash("password", _salt).Item2;

            moq.Setup(_ => _.GetByUserName(It.IsAny<string>())).ReturnsAsync(new User()
            {
                Id = "1",
                Name = "Test",
                Username = "test",
                Password = hashedPassword,
                CreatedAt = DateTime.Now,
                Salt = _salt
            });

            moq.Setup(_ => _.Get(It.IsAny<string>())).ReturnsAsync(new User()
            {
                Id = "1",
                Name = "Test",
                Username = "test",
                Password = hashedPassword,
                CreatedAt = DateTime.Now,
                Salt = _salt
            });

            moq.Setup(_ => _.List(It.IsAny<string>())).ReturnsAsync(new List<User>()
            {
                new User() { Id = "1", Name = "Test", Username = "test", Password = hashedPassword, CreatedAt = DateTime.Now },
                new User() { Id = "2", Name = "Test2", Username = "test2", Password = hashedPassword, CreatedAt = DateTime.Now },
                new User() { Id = "3", Name = "Test3", Username = "test3", Password = hashedPassword, CreatedAt = DateTime.Now }
            });

            var input = new CreateUserInput()
            {
                Username = "test",
                Name = "Test",
                Password = "password",
                ConfirmPassword = "password"
            };

            moq.Setup(_ => _.Insert(input)).ReturnsAsync(new User()
            {
                Id = "1",
                Name = "Test",
                Username = "test",
                Password = hashedPassword,
                CreatedAt = DateTime.Now,
                Salt = _salt
            });

            return moq;
        }

        public static Mock<IUserService> Get_UserNameEmpty()
        {
            var moq = new Mock<IUserService>();

            moq.Setup(_ => _.GetByUserName(It.Is<string>(_ => string.IsNullOrEmpty(_)))).ThrowsAsync(new Exception("User cannot be empty"));

            return moq;
        }

        public static Mock<IUserService> Get_UserNull()
        {
            var moq = new Mock<IUserService>();

            moq.Setup(_ => _.GetByUserName(It.IsAny<string>())).ReturnsAsync((User)null);

            return moq;
        }
    }
}
