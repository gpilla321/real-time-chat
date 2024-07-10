using ChatAPI.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.DTO
{
    public class UserMessageDTO
    {
        public string Id { get; set; }
        public User From { get; set; }
        public User To { get; set; }
        public DateTime Timestamp { get; set; }
        public string Content { get; set; }
    }
}
