
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface IBattleFacade
    {
        List<Battle> GetBattlesLibrary();
        Battle GetBattle(Guid id);
        void CreateBattle(Battle newBattle);
    }
}
