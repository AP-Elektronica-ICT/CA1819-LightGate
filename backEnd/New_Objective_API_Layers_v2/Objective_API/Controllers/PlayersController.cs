using System;
using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;

[Route("api/v1/players")]

public class PlayersController : Controller
{
    private readonly IPlayerFacade facade;

    public PlayersController(IPlayerFacade facade)
    {
        this.facade = facade;
    }

    // Get full library

    [HttpGet]

    public List<Player> GetPlayersLibrary()
    {
        return facade.GetPlayersLibrary();
    }

    // Get specific player

    [Route("{id}")]
    [HttpGet]

    public Player GetPlayer(Guid id)
    {
        return facade.GetPlayer(id);
    }

    // Add specific player

    [HttpPost]
    
    public Player CreatePlayer([FromBody] Player newPlayer)
    {
        return facade.CreatePlayer(newPlayer);
    }

    // Update specific player
    [Route("{id}")]
    [HttpPut]

    public Player UpdatePlayer([FromBody] Player updatePlayer)
    {
        return facade.UpdatePlayer(updatePlayer);
    }
}