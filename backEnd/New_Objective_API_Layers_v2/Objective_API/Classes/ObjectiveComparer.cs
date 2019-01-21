using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Objective_API.Classes
{
    public class ObjectiveComparer
    {
        public bool Compare(List<string> tags, string objective1, string objective2 )
        {
            bool Value1IsCorrect = false;
            bool Value2IsCorrect = false;
            bool FinalResult = false;
            for (int i = 0; i < tags.Count; i++)
            {
                if (objective1 == tags[i])
                {
                    Value1IsCorrect = true;
                }
                if (objective2 == tags[i])
                {
                    Value2IsCorrect = true;
                }
            }
            if (Value1IsCorrect && Value2IsCorrect)
            {
                FinalResult = true;
            }

            
            return FinalResult;
        }
    }
}
