using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.Model
{
    public class Message : Base
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Content { get; set; }
        public string ChannelId { get; set; }
        public DateTime Timestamp { get; set; }
        public string ClientUID { get; set; }
        public List<string> ViewedBy { get; set; }
    }
}
