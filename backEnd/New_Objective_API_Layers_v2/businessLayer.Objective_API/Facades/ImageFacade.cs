using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Clarifai;
using businessLayer.Objective_API.Clarifai;
using System.Threading.Tasks;

namespace businessLayer.Objective_API.Facades
{
    public class ImageFacade: IImageFacade
    {
        private readonly LibraryContext context;
        ImageRecognizer clarifai = new ImageRecognizer();

        public ImageFacade(LibraryContext context)
        {
            this.context = context;
        }

        // Get full library

        public List<Image> GetImagesLibrary()
        {
            try
            {
                return context.Images.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine("GET ImagesLibrary() - Status: Failed");
                throw e;
            }
        }

        // Get specific Image
        public Image GetImage(Guid id)
        {
            try
            {
                var image = context.Images
                   .SingleOrDefault(d => d.Id == id);
                //SingleOrDefault is very important here!

                if (image != null)
                {
                    return image;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("GET Image() - Status: Failed");
                throw e;
            }
        }

       
        // Add specific Image

        public Image CreateImage(Image newImage)
        {
            try
            {
                newImage.Id = Guid.NewGuid();
                Console.WriteLine("THE POSTED IMAGE IS " + newImage.Base64String);
                context.Images.Add(newImage);
                context.SaveChanges();

                

                return newImage;
            }
            catch (Exception e)
            {
                Console.WriteLine("POST CreateImage() - Status: Failed");
                throw e;
            }
        }

        public async Task<List<string>> PredictLabels(string base64)
        {
            return await clarifai.PredictLabels(base64);
        }


        // -- END -- 
    }
}
