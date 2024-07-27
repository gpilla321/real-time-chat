using ChatAPI.Domain.DTO;
using ChatAPI.Domain.Model;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace ChatAPI.GraphQL
{
    public class Subscription
    {
        [Subscribe]
        [Topic("MessageSent")]
        public Message MessageSent([EventMessage] Message message) => message;
    }
}
