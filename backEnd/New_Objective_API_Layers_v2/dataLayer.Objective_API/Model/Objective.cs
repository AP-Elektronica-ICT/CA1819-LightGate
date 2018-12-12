using System.Collections.Generic;
using Newtonsoft.Json;

namespace Model{

    public class Objective
    {
        public int Id {get; set;}
        public string Description {get; set;}
        public virtual ICollection<Label> Labels {get; set;}
    }

}