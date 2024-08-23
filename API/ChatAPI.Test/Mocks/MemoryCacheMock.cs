using Microsoft.Extensions.Caching.Memory;
using Moq;

namespace ChatAPI.Test.Mocks
{
    public static class MemoryCacheMock
    {
        public static Mock<IMemoryCache> Get()
        {
            var moq = new Mock<IMemoryCache>();
            return moq;
        }
    }
}
