using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes.Jobs
{
    public class Mage : BaseFighter
    {
        public Mage() : base("mage", 5)
        {
        }

        public override int UsePower(int health)
        {
            health -= power;
            return health;
        }
    }
}
