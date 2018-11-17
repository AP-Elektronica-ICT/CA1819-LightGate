using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace businessLayer.Objective_API.Facades
{
    public class LabelFacade: ILabelFacade
    {
        private readonly LibraryContext context;

        public LabelFacade(LibraryContext context)
        {
            this.context = context;
        }

        // Get full library

        public List<Label> GetLabelsLibrary()
        {
            try
            {
                return context.Labels.ToList();
            }
            catch(Exception e)
            {
                Console.WriteLine("GET LabelsLibrary() - Status: Failed");
                throw e;
            }
        }
    }
}
