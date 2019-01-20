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

        public Task UpdateGuildList()
        {
            return Clients.All.SendAsync("UpdateGuildList");
        }

        public Task UpdateBattleState()
        {
            return Clients.All.SendAsync("UpdateBattleState");
        }

        public Task UpdateCurrentBattle()
        {
            return Clients.All.SendAsync("UpdateCurrentBattle");
        }

        public Task UpdateHealthBar()
        {
            return Clients.All.SendAsync("UpdateHealthBar");
        }        
    }
}
