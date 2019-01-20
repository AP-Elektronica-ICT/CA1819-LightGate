using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes.Jobs
{
    public abstract class BaseFighter
    {
        public string Name { get; }
        protected int power;

        public BaseFighter(string _name, int _power)
        {
            Name = _name;
            power = _power;
        }

        public abstract int UsePower(int health);
    }
}
