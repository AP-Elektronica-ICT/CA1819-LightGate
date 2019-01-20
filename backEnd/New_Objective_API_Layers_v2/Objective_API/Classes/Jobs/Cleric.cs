using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes.Jobs
{
    public class Cleric : BaseFighter
    {
        public Cleric() : base("cleric", 7) {}

        public override int UsePower(int health)
        {
            health += power;
            return health;
        }
    }
}
