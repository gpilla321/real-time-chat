using ChatAPI.Infrastructure.Repository;
using ChatAPI.Tests.Mocks;
using Moq;
using NUnit.Framework;

namespace ChatAPI.Tests.Services
{
    [TestFixture]
    public class LoginServiceTest
    {
        private Mock<IUserRepository> _userRepositoryMock;

        [SetUp]
        public void Setup()
        {
            _userRepositoryMock = UserRepositoryMock.Get();
        }

        [Test]
        public void Login_Success()
        {
            Assert.That(true);
        }

        [Test]
        public void Login_Error()
        {
            Assert.That(false);
        }
    }
}
