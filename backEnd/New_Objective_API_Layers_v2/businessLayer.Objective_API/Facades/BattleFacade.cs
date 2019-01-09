using Microsoft.EntityFrameworkCore;
using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace businessLayer.Objective_API.Facades
{
    public class BattleFacade : IBattleFacade
    {
        private readonly LibraryContext context;

        public BattleFacade(LibraryContext context)
        {
            this.context = context;
        }

        // Get full library

        public List<Battle> GetBattlesLibrary()
        {
            try
            {
                return context.Battles.Include(d => d.Guilds).ThenInclude(d => d.Players).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine("GET BattlesLibrary() - Status: Failed");
                throw e;
            }
        }

        // Get specific battle
        public Battle GetBattle(Guid id)
        {
            try
            {
                var battle = context.Battles.Include(d => d.Guilds).ThenInclude(d => d.Players)
                   .SingleOrDefault(d => d.Id == id);
                //SingleOrDefault is very important here!

                if (battle != null)
                {
                    return battle;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("GET Battle() - Status: Failed");
                throw e;
            }
        }

        //Get specific guild from a specific battle
        public Guild GetSpecificGuildFromBattle(Guid battleId, Guid guildId)
        {
            try
            {
                var guild = context.Battles.Include(d => d.Guilds).ThenInclude(d => d.Players)
                   .SingleOrDefault(d => d.Id == battleId).Guilds.SingleOrDefault(d => d.Id == guildId);
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
                Console.WriteLine("GET SpecificGuildFromBattle() - Status: Failed");
                throw e;
            }
        }
        // Get all guilds from a specific battle
        public List<Guild> GetAllGuildsFromBattle(Guid id)
        {
            try
            {
                var guilds = context.Battles.Include(d => d.Guilds).ThenInclude(d => d.Players)
                   .SingleOrDefault(d => d.Id == id).Guilds;
                //SingleOrDefault is very important here!

                if (guilds != null)
                {
                    return guilds.ToList();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("GET AllGuildsFromBattle() - Status: Failed");
                throw e;
            }
        }

        // Add specific battle

        public Battle CreateBattle(Battle newBattle)
        {
            try
            {
                newBattle.Id = Guid.NewGuid();
                context.Battles.Add(newBattle);
                context.SaveChanges();
                return newBattle;
            }
            catch (Exception e)
            {
                Console.WriteLine("POST CreateBattle() - Status: Failed");
                throw e;
            }
        }

        public List<Battle> GetAllBattlesWith(string name, int? page, string sort, int length = 3, string dir = "asc")
        {
            IQueryable<Battle> query = context.Battles.Include(d => d.Guilds).ThenInclude(d => d.Players);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name.Contains(name));

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
                query = query.Take(length);

            return query.ToList();
        }

        public Battle UpdateBattle(Battle updateBattle)
        {
            try
            {
                var orgBattle = context.Battles
                   .SingleOrDefault(d => d.Id == updateBattle.Id);

                if (orgBattle != null)
                {
                    orgBattle.InSession = updateBattle.InSession;

                    context.SaveChanges();
                    return orgBattle;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("PUT UpdateBattle() - Status: Failed");
                throw e;
            }


        }




        // -- END -- 
    }
}
