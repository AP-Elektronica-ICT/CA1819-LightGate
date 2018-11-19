using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace dataLayer.Objective_API.Model
{
    public class Guild
    {
        public Guid Id { get; set; }
        //public Player Leader { get; set; }
        public string GuildName { get; set; }
        public ICollection<Player> Players { get; set; }

    }
}
