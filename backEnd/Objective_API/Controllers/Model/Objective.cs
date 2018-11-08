using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model{

    public class Objective
    {
        public int Id {get; set;}
        public string Description {get; set;}

        //Labels have to be added
        public virtual ICollection<Label> Labels {get; set;}
    }

}