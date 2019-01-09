
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
        Battle CreateBattle(Battle newBattle);
        List<Battle> GetAllBattlesWith(string name, int? page, string sort, int length = 3, string dir = "asc");
        List<Guild> GetAllGuildsFromBattle(Guid id);
        Battle UpdateBattle(Battle updateBattle);
        Guild GetSpecificGuildFromBattle(Guid battleId, Guid guildId);
    }
}
