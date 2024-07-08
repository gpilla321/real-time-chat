using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.InputType
{
    public class CreateChannelInput
    {
        public string From { get; set; }
        public string To { get; set; }
    }
}
