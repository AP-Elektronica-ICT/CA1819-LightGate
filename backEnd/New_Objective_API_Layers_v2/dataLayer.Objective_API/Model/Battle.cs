using System;
using System.Collections.Generic;
using System.Text;

namespace dataLayer.Objective_API.Model
{
    class Battle
    {
        public Guid Id { get; set; }
        public ICollection<Guild> Guilds { get; set; }

        // Time
        // ...
    }
}
