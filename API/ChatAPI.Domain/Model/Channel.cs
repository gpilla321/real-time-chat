using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.Model
{
    public class Channel : Base
    {
        public string From { get; set; }
        public string To { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
