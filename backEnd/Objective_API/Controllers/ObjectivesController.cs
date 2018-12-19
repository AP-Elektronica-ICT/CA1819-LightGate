using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

[Route("api/v1/objectives")]

public class ObjectivesController : Controller
{
    private readonly LibraryContext context;

    public ObjectivesController(LibraryContext context)
    {
        this.context = context;
    }

    // Get full library

    [HttpGet]

    public List<Objective> GetObjectivesLibrary()
    {
        return context.Objectives.Include(d => d.Labels).ToList();
    }

    // Get specific objective

    [Route("{id}")]
    [HttpGet]

    public IActionResult GetObjective(int id)
    {
        var objective = context.Objectives.Include(d => d.Labels)
            .Where(d => d.Id == id)
            .Include(d => d);

        if(objective == null)
        {
            return NotFound();
        }

        return Ok(objective);
    }

    // Add specific objective

    [HttpPost]
    
    public IActionResult CreateObjective([FromBody] Objective newObjective)
    {
        context.Objectives.Add(newObjective);
        context.SaveChanges();
        return Created("", newObjective);
    }

    // Remove specific objective

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
    }    
}