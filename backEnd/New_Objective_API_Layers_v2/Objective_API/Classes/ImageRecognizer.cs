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



        public async Task PredictLabels(string img)
        {

            var res = await this.client.PublicModels.GeneralModel
            .Predict(new ClarifaiURLImage(img))
            .ExecuteAsync();
            Console.WriteLine("IN CLARIFAI CLASS");
            decimal? testvalue;
            string testName;
            decimal? compareValue = 0.1;
            foreach (var concept in res.Get().Data)
            {
                Console.WriteLine($"{concept.Name}: {concept.Value}");
                testvalue = concept.Value;
                testName = concept.Name;
                if (testvalue > compareValue)
                {
                    tagList = new List<string> { testName };
                }

                System.Diagnostics.Debug.WriteLine($"{concept.Name}: {concept.Value}");
            }
        }
    }
}
