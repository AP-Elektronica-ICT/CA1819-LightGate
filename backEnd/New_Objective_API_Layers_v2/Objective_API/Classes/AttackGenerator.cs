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

        public Guild AttackOnGuild( string image,
                                    string objective1,
                                    string objective2,
                                    string job,
                                    Guild ownGuild,
                                    Guild frontGuild,
                                    Guild backGuild)
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
                        frontGuild.Health = knight.UsePower(frontGuild.Health);
                        return frontGuild;
                        break;
                    case "mage":
                        backGuild.Health = mage.UsePower(backGuild.Health);
                        return backGuild;
                        break;
                    case "cleric":
                        ownGuild.Health = cleric.UsePower(ownGuild.Health);
                        return ownGuild;
                        break;
                }
            }
            return ownGuild;

        }
    }
}
