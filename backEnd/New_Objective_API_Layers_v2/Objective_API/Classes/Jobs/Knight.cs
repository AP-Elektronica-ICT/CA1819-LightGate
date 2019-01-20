using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes.Jobs
{
    public class Knight : BaseFighter
    {
        public Knight() : base("knight", 10)
        {
        }

        public override int UsePower(int health)
        {
            health -= power;
            return health;
        }
    }
}
