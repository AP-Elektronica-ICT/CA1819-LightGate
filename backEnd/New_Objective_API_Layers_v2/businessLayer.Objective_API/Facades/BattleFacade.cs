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
                var battle = context.Battles
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


        // -- END -- 
    }
}
