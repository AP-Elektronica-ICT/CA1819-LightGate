using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface IObjectiveFacade
    { 
        List<Objective> GetObjectivesLibrary();
        Objective GetObjective(int id);
        void CreateObjective(Objective newObjective);
    }
}
