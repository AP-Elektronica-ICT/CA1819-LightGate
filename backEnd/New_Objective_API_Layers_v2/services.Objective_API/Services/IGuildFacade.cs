
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface IGuildFacade
    {
        List<Guild> GetGuildsLibrary();
        Guild GetGuild(Guid id);
        Guild CreateGuild(Guild newGuild);
        List<Player> GetAllPlayersFromGuild(Guid id);
    }
}
