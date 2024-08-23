using ChatAPI.Domain.DTO;
using ChatAPI.Services.Service;
using ChatAPI.Test.Mocks.Services;
using Moq;
using NUnit.Framework;

namespace ChatAPI.Test.Services
{
    [TestFixture]
    public class LoginServiceTests
    {
        private ILoginService _loginService;

        [SetUp]
        public void Setup()
        {
            var userServiceMock = UserServiceMock.Get();
            Environment.SetEnvironmentVariable("JWT_SECRET", "maksmdkasnkb2j131273912mdsadamk2315m21s");
            _loginService = new LoginService(userServiceMock.Object);
        }

        [TearDown]
        public void TearDown()
        {
            var userServiceMock = UserServiceMock.Get();
            _loginService = new LoginService(userServiceMock.Object);
        }

        [Test]
        public async Task Login_Success()
        {
            var login = new LoginDTO()
            {
                Username = "test",
                Password = "password"
            };

            var loggedInDTO = await _loginService.Login(login);

            Assert.NotNull(loggedInDTO);
        }

        [Test]
        public async Task Login_Error_InvalidUser()
        {
            _loginService = new LoginService(UserServiceMock.Get_UserNameEmpty().Object);

            var login = new LoginDTO()
            {
                Username = "",
                Password = "password"
            };

            var exception = Assert.ThrowsAsync<Exception>(async () => await _loginService.Login(login));

            Assert.That(exception.Message, Is.EqualTo("User cannot be empty"));
        }


        [Test]
        public async Task Login_Error_UserNotFound()
        {
            _loginService = new LoginService(UserServiceMock.Get_UserNull().Object);

            var login = new LoginDTO()
            {
                Username = "",
                Password = "password"
            };

            var exception = Assert.ThrowsAsync<Exception>(async () => await _loginService.Login(login));

            Assert.That(exception.Message, Is.EqualTo("Invalid username or password"));
        }

        [Test]
        public async Task Login_Error_PasswordInvalid()
        {
            var login = new LoginDTO()
            {
                Username = "test",
                Password = "wrong_password"
            };

            var exception = Assert.ThrowsAsync<Exception>(async () => await _loginService.Login(login));

            Assert.That(exception.Message, Is.EqualTo("Invalid username or password"));
        }
    }
}
