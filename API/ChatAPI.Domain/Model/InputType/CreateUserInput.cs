﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Domain.Model.InputType
{
    public class CreateUserInput
    {
        public string Name { get; set; }
        public string Username { get; set; }
    }
}
