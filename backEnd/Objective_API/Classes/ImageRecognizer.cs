using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clarifai.API;
using Clarifai.DTOs.Inputs;

namespace Objective_API.Classes
{
    public class ImageRecognizer
    {
        private ClarifaiClient client;
        public ImageRecognizer()
        {
            this.client = new ClarifaiClient("44b3fcacff504de8b6c7ef46c753321b");
        }

        public async Task PredictLabels(string img = "https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/10/19/13/city-bike-header2.jpg?width=1000&height=614&fit=bounds&format=pjpg&auto=webp&quality=70&crop=16:9,offset-y0.5")
        {

            var res = await this.client.PublicModels.GeneralModel
            .Predict(new ClarifaiURLImage(img))
            .ExecuteAsync();

            foreach (var concept in res.Get().Data)
            {
                System.Diagnostics.Debug.WriteLine($"{concept.Name}: {concept.Value}");
            }
        }
    }
}
