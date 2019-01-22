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
                    Id = System.Guid.NewGuid(),
                    Name = "myFirstBattle",
                    BattleTimeInMinutes = "30",
                    InSession = false
                };


                var g = new Guild()
                {
                    Id = System.Guid.NewGuid(),
                    GuildName = "DevTeam",
                    BattleId = b.Id,
                    Battle = b,
                    Health = 100,
                    AttackedBy = null,
                    Attacking = null
                };

                var g2 = new Guild()
                {
                    Id = System.Guid.NewGuid(),
                    GuildName = "OpsTeam",          
                    BattleId = b.Id,
                    Battle = b,
                    Health = 100,
                    AttackedBy = null,
                    Attacking = null
                    
                };

                var p = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Denny",
                    GuildId = g.Id,
                    Guild = g,
                    IsCreator = false,
                    MyJob="knight"
                
                };
                
                var p2 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Steven",
                    GuildId = g.Id,
                    Guild = g,
                    IsCreator = false,
                    MyJob = "mage"
                };

                var p3 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Stijn",
                    GuildId = g.Id,
                    Guild = g,
                    IsCreator = false,
                    MyJob = "cleric"
                };

                var p4 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Ynned",
                    GuildId = g2.Id,
                    Guild = g2,
                    IsCreator = false,
                    MyJob = "cleric"
                };

                var p5 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Nevets",
                    GuildId = g2.Id,
                    Guild = g2,
                    IsCreator = false,
                    MyJob = "knight"
                };

                var p6 = new Player()
                {
                    Id = System.Guid.NewGuid(),
                    Name = "Nijts",
                    GuildId = g2.Id,
                    Guild = g2,
                    IsCreator = false,
                    MyJob = "mage"
                };

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
               Description = "laptop"
            };

            var o2 = new Objective()
            {
                Description = "bottle"
            };

            var o3 = new Objective()
            {
                Description = "chair"
            };

            var o4 = new Objective()
            {
                Description = "bag"
            };

                var o5 = new Objective()
                {
                    Description = "watch"
                };

            //Create new Label(s)

            var l = new Label()
            {
                Feature = "laptop",
                ObjectiveId = 1,
                Objective = o
            };

            var l2 = new Label()
            {
                Feature = "laptop",
                ObjectiveId = 1,
                Objective = o
            };

            var l3 = new Label()
            {
                Feature = "bottle",
                ObjectiveId = 2,
                Objective = o2
            };

            var l4 = new Label()
            {
                Feature = "bottle",
                ObjectiveId = 2,
                Objective = o2
            };

             var l5 = new Label()
                {
                    Feature = "chair",
                    ObjectiveId = 3,
                    Objective = o3
                };

                var l6 = new Label()
                {
                    Feature = "chair",
                    ObjectiveId = 3,
                    Objective = o3
                };

                var l7 = new Label()
                {
                    Feature = "bag",
                    ObjectiveId = 4,
                    Objective = o4
                };

                var l8 = new Label()
                {
                    Feature = "bag",
                    ObjectiveId = 4,
                    Objective = o4
                };

                var l9 = new Label()
                {
                    Feature = "watch",
                    ObjectiveId = 5,
                    Objective = o5
                };

                var l10 = new Label()
                {
                    Feature = "watch",
                    ObjectiveId = 5,
                    Objective = o5
                };



            //Add everything to their respective collection
            context.Objectives.Add(o);
            context.Objectives.Add(o2);
            context.Objectives.Add(o3);
            context.Objectives.Add(o4);
            context.Objectives.Add(o5);
            context.Labels.Add(l);
            context.Labels.Add(l2);
            context.Labels.Add(l3);
            context.Labels.Add(l4);
            context.Labels.Add(l5);
            context.Labels.Add(l6);
            context.Labels.Add(l7);
            context.Labels.Add(l8);
            context.Labels.Add(l9);
            context.Labels.Add(l10);

                //Save all changes to the DB
                context.SaveChanges();
        }
    }

  }
}