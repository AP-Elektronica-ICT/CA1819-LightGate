using System;
using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;

[Route("api/v1/guilds")]

public class GuildsController : Controller
{
    private readonly IGuildFacade facade;

    public GuildsController(IGuildFacade facade)
    {
        this.facade = facade;
    }

    // Get full library

    [HttpGet]

    public List<Guild> GetGuildsLibrary()
    {
        return facade.GetGuildsLibrary();
    }

    // Get specific guild

    [Route("{id}")]
    [HttpGet]

    public Guild GetGuild(Guid id)
    {
        return facade.GetGuild(id);
    }

    // Add specific guild

    [HttpPost]
    
    public Guild CreateGuild([FromBody] Guild newGuild)
    {
        return facade.CreateGuild(newGuild);
    }   
}