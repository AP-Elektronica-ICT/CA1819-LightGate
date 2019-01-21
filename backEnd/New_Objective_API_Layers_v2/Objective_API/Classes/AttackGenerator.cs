using businessLayer.Objective_API.Clarifai;
using Model;
using Objective_API.Classes.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes
{
    public class AttackGenerator
    {
        private Knight knight = new Knight();
        private Mage mage = new Mage();
        private Cleric cleric = new Cleric();

        new ImageRecognizer imageRegognize;
        new ObjectiveComparer objectiveCompaire;

        public Guild AttackOnGuild( string image, Objective myObjectives, string job, Guild guildToAttack)
        {
            List<string> tags;
            //tags = imagerecognizer.RecognizeImage(image);
            tags = imageRegognize.tagList;
            bool isHit = true;
            isHit = objectiveCompaire.Compare(tags, objective1, objective1);


            if (isHit)
            {
                switch (job)
                {
                    case "knight":
                        guildToAttack.Health = knight.UsePower(guildToAttack.Health);
                        break;
                    case "mage":
                        guildToAttack.Health = mage.UsePower(guildToAttack.Health);
                        break;
                    case "cleric":
                        guildToAttack.Health = cleric.UsePower(guildToAttack.Health);
                        break;
                }
            }
            return guildToAttack;

        }
    }
}
