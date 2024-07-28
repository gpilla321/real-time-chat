using ChatAPI.Domain.DTO;
using ChatAPI.Domain.DTO.Subscription;
using ChatAPI.Domain.Model;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace ChatAPI.GraphQL
{
    public class Subscription
    {
        [Subscribe]
        [Topic($"{{{nameof(channelId)}}}")]
        public Message MessageSent(string channelId, [EventMessage] Message message) => message;

        [Subscribe]
        [Topic($"{{{nameof(userId)}}}")]
        public NewMessageDTO NewMessage(string userId, [EventMessage] NewMessageDTO newMessage) => newMessage;
    }
}
