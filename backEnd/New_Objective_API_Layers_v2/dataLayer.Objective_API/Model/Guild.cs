using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace dataLayer.Objective_API.Model
{
    class Guild
    {
        public Guid Leader { get; set; }
        public string GuildName { get; set; }
        public ICollection<Player> Players { get; set; }

    }
}
