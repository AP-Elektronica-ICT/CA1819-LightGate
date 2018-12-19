
using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace businessLayer.Objective_API.Facades
{
    public class GuildFacade : IGuildFacade
    {
        private readonly LibraryContext context;

        public GuildFacade(LibraryContext context)
        {
            this.context = context;
        }

        // Get full library

        public List<Guild> GetGuildsLibrary()
        {
            try
            {
                return context.Guilds.Include(d => d.Players).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine("GET GuildsLibrary() - Status: Failed");
                throw e;
            }
        }

        // Get specific guild
        public Guild GetGuild(Guid id)
        {
            try
            {
                var guild = context.Guilds
                   .SingleOrDefault(d => d.Id == id);
                //SingleOrDefault is very important here!

                if (guild != null)
                {
                    return guild;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("GET Guild() - Status: Failed");
                throw e;
            }
        }

        // Add specific guild

        public void CreateGuild(Guild newGuild)
        {
            try
            {
                newGuild.Id = Guid.NewGuid();
                context.Guilds.Add(newGuild);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine("POST CreateGuild() - Status: Failed");
                throw e;
            }
        }

        // -- END -- 
    }
}
