using dataLayer.Objective_API.Model;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface IPlayerFacade
    {
        List<Player> GetPlayersLibrary();
        Player GetPlayer(Guid id);
        void CreatePlayer(Player newPlayer);
    }
}
