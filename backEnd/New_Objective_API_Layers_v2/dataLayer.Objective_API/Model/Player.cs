
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }        
        public Guid? GuildId { get; set; }

        [ForeignKey("GuildId")]
        [JsonIgnore]
        public Guild Guild { get; set; }

        public Job MyJob { get; set; }
        public bool IsCreator { get; set; }
    }
}
