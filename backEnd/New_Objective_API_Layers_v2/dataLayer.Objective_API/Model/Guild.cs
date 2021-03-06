﻿using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model
{
    public class Guild
    {
        public Guid Id { get; set; }
        public string GuildName { get; set; }
        public Guid? BattleId { get; set; }

        [ForeignKey("AttackedBy")]
        public Guid? AttackedBy { get; set; }

       [ForeignKey("Attacking")]
        public Guid? Attacking { get; set; }
        public int Health { get; set; }

        [ForeignKey("BattleId")]
        [JsonIgnore]
        public Battle Battle { get; set; }
        public ICollection<Player> Players { get; set; }

    }
}
