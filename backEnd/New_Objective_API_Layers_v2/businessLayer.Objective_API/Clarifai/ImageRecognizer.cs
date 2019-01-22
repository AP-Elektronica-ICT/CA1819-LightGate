using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clarifai.API;
using Clarifai.DTOs.Inputs;

namespace businessLayer.Objective_API.Clarifai
{
    public class ImageRecognizer
    {
        private ClarifaiClient client;
        public ImageRecognizer()
        {
            this.client = new ClarifaiClient("44b3fcacff504de8b6c7ef46c753321b");
        }

        public List<string> tagList { get; set; }



        public async Task<List<string>> PredictLabels(string img)
        {
            tagList = new List<string>();
            var res = await this.client.PublicModels.GeneralModel
            .Predict(new ClarifaiURLImage(img))
            .ExecuteAsync();
            Console.WriteLine("IN CLARIFAI CLASS");
            decimal? testvalue;
            string testName;
            //TODO Change compareValue to working value (decimal?)
            decimal? compareValue = 0.4m;
            foreach (var concept in res.Get().Data)
            {
                Console.WriteLine($"{concept.Name}: {concept.Value}");
                testvalue = concept.Value;
                testName = concept.Name;
                if (testvalue > compareValue)
                {
                   
                    tagList.Add(testName);
                }

                System.Diagnostics.Debug.WriteLine($"{concept.Name}: {concept.Value}");
            }
            return tagList;
        }
    }
}
