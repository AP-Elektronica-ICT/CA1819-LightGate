using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace services.Objective_API.Services
{
    public interface IImageFacade
    {
        List<Image> GetImagesLibrary();
        Image GetImage(Guid id);
        Image CreateImage(Image newImage);
        Task<List<string>> PredictLabels(string base64);
    }
}
