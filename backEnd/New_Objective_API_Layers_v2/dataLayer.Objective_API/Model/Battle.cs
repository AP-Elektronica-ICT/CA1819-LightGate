﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Battle
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string BattleTimeInMinutes { get; set; }
        public bool InSession { get; set; }
        public ICollection<Guild> Guilds { get; set; }

        
    }
}
