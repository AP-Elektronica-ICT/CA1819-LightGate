using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Battle
    {
        public Guid Id { get; set; }
        public ICollection<Guild> Guilds { get; set; }

        // Time
        // ...
    }
}
