using System;
using System.Collections.Generic;
using System.Text;

namespace dataLayer.Objective_API.Model
{
    class CreationData
    {
        public int GuildNumber { get; set; }

        public int TimeLimit { get; set; }

        public bool Participate { get; set; }

        public Array Guildnames { get; set; }
    }
}
