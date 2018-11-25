using System.Linq;

namespace Model{

public class DBInitializer
    {

    public static void Initialize(LibraryContext context)
    {
        //Create db when it's not yet created
        context.Database.EnsureCreated();            
        
        //Are there any players?
        if(!context.Players.Any())
            {
                var b = new Battle()
                {
                    Id = System.Guid.NewGuid()
                };


                var g = new Guild()
                {
                    Id = System.Guid.NewGuid(),
                    GuildName = "DevTeam",
                    BattleId = b.Id,
                    Battle = b
                };

                var g2 = new Guild()
                {
                    Id = System.Guid.NewGuid(),
                    GuildName = "OpsTeam",
                    BattleId = b.Id,
                    Battle = b
                };

                var p = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Denny",
                    GuildId = g.Id,
                    Guild = g
                
                };
                
                var p2 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Steven",
                    GuildId = g.Id,
                    Guild = g
                };

                var p3 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Stijn",
                    GuildId = g.Id,
                    Guild = g
                };

                var p4 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Ynned",
                    GuildId = g2.Id,
                    Guild = g2

                };

                var p5 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Nevets",
                    GuildId = g2.Id,
                    Guild = g2
                };

                var p6 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Nijts",
                    GuildId = g2.Id,
                    Guild = g2
                };

                //Add leader to guild

                //g.Leader = p;

                //Add everything to their respective collection
                context.Players.Add(p);
                context.Players.Add(p2);
                context.Players.Add(p3);
                context.Players.Add(p4);
                context.Players.Add(p5);
                context.Players.Add(p6);

                context.Guilds.Add(g);
                context.Guilds.Add(g2);
                
                context.Battles.Add(b);
                
                //Save all changes to the DB
                context.SaveChanges();
            }
        
            

            //Are there any objectives?
            if (!context.Objectives.Any())
        {

            //Create new Objective(s)
            var o = new Objective()
            {
               Description = "car & church"
            };

            var o2 = new Objective()
            {
                Description = "human & tree"
            };

            //Create new Label(s)

            var l = new Label()
            {
                Feature = "car",
                ObjectiveId = 1,
                Objective = o
            };

            var l2 = new Label()
            {
                Feature = "church",
                ObjectiveId = 1,
                Objective = o
            };

            var l3 = new Label()
            {
                Feature = "human",
                ObjectiveId = 2,
                Objective = o2
            };

            var l4 = new Label()
            {
                Feature = "tree",
                ObjectiveId = 2,
                Objective = o2
            };            

            //Add everything to their respective collection
            context.Objectives.Add(o);
            context.Objectives.Add(o2);
            context.Labels.Add(l);
            context.Labels.Add(l2);
            context.Labels.Add(l3);
            context.Labels.Add(l4);

            //Save all changes to the DB
            context.SaveChanges();
        }
    }

  }
}