using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace businessLayer.Objective_API.Hubs
{
    public class BattleHub: Hub
    {
        public Task UpdateBattleList()
        {
            return Clients.All.SendAsync("UpdateBattleList");
        }
    }
}
