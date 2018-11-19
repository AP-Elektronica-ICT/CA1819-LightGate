using dataLayer.Objective_API.Model;
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

        public Guid GuildId { get; set; }

        [ForeignKey("GuildId")]
        public Guild Guild { get; set; }
    }
}
