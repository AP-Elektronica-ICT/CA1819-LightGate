using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Model{

    public class Label
    {
        public int Id {get; set;}
        public string Feature {get; set;}
        public int ObjectiveId {get; set;}

        [ForeignKey("ObjectiveId")]
        public Objective Objective {get; set;}
    }

}