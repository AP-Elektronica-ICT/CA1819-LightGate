using Microsoft.AspNetCore.Mvc;
using Model;
using services.Objective_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

    [Route("api/v1/images")]
    public class ImagesController: Controller
    {
        private readonly IImageFacade facade;

        public ImagesController(IImageFacade facade)
        {
            this.facade = facade;
        }

        // Get full library

        [HttpGet]

        public List<Image> GetImagesLibrary()
        {
            return facade.GetImagesLibrary();
        }

        // Get specific image

        [Route("{id}")]
        [HttpGet]

        public Image GetImage(Guid id)
        {
            return facade.GetImage(id);
        }

        // Add specific image

        [HttpPost]

        public Image CreateImage([FromBody] Image newImage)
        {
            return facade.CreateImage(newImage);
        }
    }

