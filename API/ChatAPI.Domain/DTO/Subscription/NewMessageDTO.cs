using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.DTO.Subscription
{
    public class NewMessageDTO
    {
        public string ChannelId { get; set; }
        public string Message { get; set; }
        public string From { get; set; }
    }
}
