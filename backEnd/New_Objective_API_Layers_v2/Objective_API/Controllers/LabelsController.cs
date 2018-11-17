using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;

[Route("api/v1/labels")]

public class LabelsController : Controller
{
    private readonly ILabelFacade facade;

    public LabelsController(ILabelFacade facade)
    {
        this.facade = facade;
    }

    // Get full library


    [HttpGet]

    public List<Label> GetLabelsLibrary()
    {
        return facade.GetLabelsLibrary();
    }

    /* Get specific label

    [Route("{id}")]
    [HttpGet]

    public IActionResult GetLabel(int id)
    {
        var label = context.Labels
            .Where(d => d.Id == id)
            .Include(d => d);

        if(label == null)
        {
            return NotFound();
        }

        return Ok(label);
    }

    // Add specific label

    [HttpPost]
    
    public IActionResult CreateLabel([FromBody] Label newLabel)
    {
        context.Labels.Add(newLabel);
        context.SaveChanges();
        return Created("", newLabel);
    }

    // Remove specific label

    [Route("{id}")]
    [HttpDelete]

     public IActionResult DeleteLabel(int id)
    {
        var label = context.Labels.Find(id);
        
        if(label == null)
        {
            return NotFound();
        }

        context.Labels.Remove(label);
        context.SaveChanges();
        return NoContent();
    }

    // Update specific label

     [HttpPut]

    public IActionResult UpdateLabel([FromBody] Label UpdateLabel)
    {
        var orgLabel = context.Labels.Find(UpdateLabel.Id);
        if(orgLabel == null)
        {
            return NotFound();
        }

        orgLabel.Feature = UpdateLabel.Feature;
        
        context.SaveChanges();
        return Ok(UpdateLabel);
    } */   
}