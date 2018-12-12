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

        // -- END -- 
    }
}
