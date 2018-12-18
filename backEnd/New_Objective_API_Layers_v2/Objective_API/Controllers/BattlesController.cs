using System;
using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;

[Route("api/v1/battles")]

public class BattlesController : Controller
{
    private readonly IBattleFacade facade;

    public BattlesController(IBattleFacade facade)
    {
        this.facade = facade;
    }

    /* Get full library

    [HttpGet]

    public List<Battle> GetBattlesLibrary()
    {
        return facade.GetBattlesLibrary();
    }*/

    // Get specific battle

    [Route("{id}")]
    [HttpGet]

    public Battle GetBattle(Guid id)
    {
        return facade.GetBattle(id);
    }

    // Add specific battle

    [HttpPost]

    public Battle CreateBattle([FromBody] Battle newBattle)
    {
        return facade.CreateBattle(newBattle);
    }

    //Search specific battle using pagination
    [HttpGet]
    public List<Battle> GetAllBattlesWith(string name, int? page, string sort, int length = 5, string dir = "asc")
    {
        return facade.GetAllBattlesWith(name, page, sort, length, dir);
    }

    // Get all players from a specific guild
    [Route("{id}/guilds")]
    [HttpGet]

    public List<Guild> GetAllGuildsFromBattle(Guid id)
    {
        return facade.GetAllGuildsFromBattle(id);
    }
}