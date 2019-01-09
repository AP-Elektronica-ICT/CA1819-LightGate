using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Base64String { get; set; }

        [ForeignKey("PlayerId")]
        [JsonIgnore]
        public Player Player { get; set; }
        public Guid PlayerId { get; set; }

        //Timestamp?
    }
}
