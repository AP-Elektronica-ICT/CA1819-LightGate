using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface ILabelFacade
    {
        List<Label> GetLabelsLibrary();
    }
}
