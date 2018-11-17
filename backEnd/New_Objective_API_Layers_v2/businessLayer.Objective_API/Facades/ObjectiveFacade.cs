using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace businessLayer.Objective_API.Facades
{
    public class ObjectiveFacade: IObjectiveFacade
    {
        private readonly LibraryContext context;

        public ObjectiveFacade(LibraryContext context)
        {
            this.context = context;
        }

        // Get full library

        public List<Objective> GetObjectivesLibrary()
        {
            try
            {
                return context.Objectives.Include(d => d.Labels).ToList();
            }
            catch(Exception e)
            {
                Console.WriteLine("GET ObjectivesLibrary() - Status: Failed");
                throw e;
            }
        }

        // Get specific objective
        public Objective GetObjective(int id)
        {
            try
            {
                var objective = context.Objectives
                    .Include(d => d.Labels).SingleOrDefault(d => d.Id == id);
                //SingleOrDefault is very important here!

                if (objective != null)
                {
                    return objective;
                }
                else
                {
                    return null;
                }
            }
            catch(Exception e)
            {
                Console.WriteLine("GET Objective() - Status: Failed");
                throw e;
            }
        }

        // Add specific objective

        public void CreateObjective(Objective newObjective)
        {
            try
            {
                context.Objectives.Add(newObjective);
                context.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine("POST CreateObjective() - Status: Failed");
                throw e;
            }
        }

        // -- END -- 
    }
}
