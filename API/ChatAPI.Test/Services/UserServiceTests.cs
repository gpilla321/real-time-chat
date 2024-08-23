using ChatAPI.Domain.InputType;
using ChatAPI.Services.Helper;
using ChatAPI.Services.Service;
using ChatAPI.Test.Mocks;
using ChatAPI.Test.Mocks.Repositories;
using NUnit.Framework;

namespace ChatAPI.Test.Services
{
    public class UserServiceTests
    {
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            Instantiate(); 
        }

        [TearDown]
        public void TearDown()
        {
            Instantiate();
        }

        private void Instantiate()
        {
            var userRepositoryMock = UserRepositoryMock.Get();
            var memoryCacheMock = MemoryCacheMock.Get();
            _userService = new UserService(userRepositoryMock.Object, memoryCacheMock.Object);
        }

        [Test]
        public void GetByUserName_Error_UserNameEmpty()
        {
            var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.GetByUserName(""));

            Assert.That(exception.Message, Is.EqualTo("Username cannot be empty"));
        }

        [Test]
        public async Task GetByUserName_Success()
        {
            var user = _userService.GetByUserName("test");

            Assert.AreNotEqual(null, user);
        }

        [Test]
        public async Task Get_Success()
        {
            var user = _userService.Get("1");

            Assert.AreNotEqual(null, user);
        }

        [Test]
        public async Task Insert_Error_UserAlreadyExists()
        {
            var userInput = new CreateUserInput()
            {
                Username = "test",
                Name = "Test",
                Password = "123456",
                ConfirmPassword = "123456"
            };

            var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.Insert(userInput));

            Assert.That(exception.Message, Is.EqualTo("User already exists"));
        }

        [Test]
        public async Task Insert_Success()
        {
            var userRepositoryMock = UserRepositoryMock.Get_NoUserCreated();
            var memoryCacheMock = MemoryCacheMock.Get();
            _userService = new UserService(userRepositoryMock.Object, memoryCacheMock.Object);

            var userInput = new CreateUserInput()
            {
                Username = "test_user",
                Name = "This is new",
                Password = "123456",
                ConfirmPassword = "123456"
            };

            var user = await _userService.Insert(userInput);

            Assert.AreNotEqual(null, user);
            Assert.AreEqual(user.Username, userInput.Username);
            Assert.IsTrue(user.Password.Length > 0);
            Assert.IsTrue(user.Salt.Length > 0);
        }

    }
}
