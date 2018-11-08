using System.Linq;

namespace Model{

public class DBInitializer{

    public static void Initialize(LibraryContext context)
    {
        //Create db when it's not yet created
        context.Database.EnsureCreated();
        
        //Are there any objectives?
        if(!context.Objectives.Any())
        {

            //Create new Objective(s)
            var o = new Objective()
            {
               Description = "Yellow Bike"
            };

            var o2 = new Objective()
            {
                Description = "Red Car"
            };

            //Create new Label(s)

            var l = new Label()
            {
                Feature = "Bike",
                ObjectiveId = 1,
                Objective = o
            };

            var l2 = new Label()
            {
                Feature = "Yellow",
                ObjectiveId = 1,
                Objective = o
            };

            var l3 = new Label()
            {
                Feature = "Car",
                ObjectiveId = 2,
                Objective = o2
            };

            var l4 = new Label()
            {
                Feature = "Red",
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