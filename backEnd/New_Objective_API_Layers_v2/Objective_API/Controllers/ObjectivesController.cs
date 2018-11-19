using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;

[Route("api/v1/objectives")]

public class ObjectivesController : Controller
{
    private readonly IObjectiveFacade facade;

    public ObjectivesController(IObjectiveFacade facade)
    {
        this.facade = facade;
    }

    // Get full library

    [HttpGet]

    public List<Objective> GetObjectivesLibrary()
    {
        return facade.GetObjectivesLibrary();
    }

    // Get specific objective

    [Route("{id}")]
    [HttpGet]

    public Objective GetObjective(int id)
    {
        return facade.GetObjective(id);
    }

    // Add specific objective

    [HttpPost]
    
    public void CreateObjective([FromBody] Objective newObjective)
    {
        facade.CreateObjective(newObjective);
    }

    /* Remove specific objective

    [Route("{id}")]
    [HttpDelete]

     public IActionResult DeleteObjective(int id)
    {
        var objective = context.Objectives.Find(id);
        
        if(objective == null)
        {
            return NotFound();
        }

        context.Objectives.Remove(objective);
        context.SaveChanges();
        return NoContent();
    }

    // Update specific objective

     [HttpPut]

    public IActionResult UpdateObjective([FromBody] Objective UpdateObjective)
    {
        var orgObjective = context.Objectives.Find(UpdateObjective.Id);
        if(orgObjective == null)
        {
            return NotFound();
        }

        orgObjective.Description = UpdateObjective.Description;
        
        context.SaveChanges();
        return Ok(orgObjective);
    } */   
}