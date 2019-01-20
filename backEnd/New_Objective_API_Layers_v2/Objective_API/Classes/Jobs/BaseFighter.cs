using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes.Jobs
{
    public abstract class BaseFighter
    {
        public string Job { get; }
        protected int power;

        public BaseFighter(string _job, int _power)
        {
            Job = _job;
            power = _power;
        }

        public abstract int UsePower(int health);
    }
}
