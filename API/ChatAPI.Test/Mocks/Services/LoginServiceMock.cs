using ChatAPI.Domain.DTO;
using ChatAPI.Services.Service;
using Moq;

namespace ChatAPI.Test.Mocks.Services
{
    public static class LoginServiceMock
    {
        public static Mock<ILoginService> Get()
        {
            var moq = new Mock<ILoginService>();

            moq.Setup(_ => _.Login(It.IsAny<LoginDTO>())).ReturnsAsync(new LoggedInDTO() {
                Token = It.IsAny<string>(),
                Username = It.IsAny<string>(),
                Name = It.IsAny<string>(),
                UserId = It.IsAny<string>()
            });

            return moq;
        }
    }
}
