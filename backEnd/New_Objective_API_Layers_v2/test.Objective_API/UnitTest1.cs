using System;
using Xunit;
using Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using businessLayer.Objective_API.Facades;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace test.Objective_API
{
	[TestClass]
    public class UnitTest1
    {

        ObjectivesController _controller_obj;
        LabelsController _controller_lbl;
        ObjectiveFacade _facade_obj;
        LabelFacade _facade_lbl;
        
        [TestInitialize]
        public void Initialize()
        {
            var options = new DbContextOptionsBuilder<LibraryContext>()
                .UseSqlite("DataSource=C:/Users/denny/Desktop/Cloud Applications/Test_New_Objective_API_Layers_v2/test_db")
                .Options;

            using (var context = new LibraryContext(options))
            {                
                context.Database.OpenConnection();
                context.Database.EnsureCreated();

                context.Objectives.Add(new Objective()
                {
                    Id = 1,
                    Description = "test objective 1"
                });

                context.Labels.Add(new Label()
                {
                    Id = 1,
                    Feature = "test label 1"
                });          
            }

            _facade_obj = new ObjectiveFacade(new LibraryContext(options));
            _controller_obj = new ObjectivesController(_facade_obj);

            _facade_lbl = new LabelFacade(new LibraryContext(options));
            _controller_lbl = new LabelsController(_facade_lbl);
        }

        [TestMethod]
        public void GetObjectivesLibraryTest()
        {
            // Act
            var okResult = _controller_obj.GetObjectivesLibrary();

            //First Failure
            //Assert.IsNull(okResult);

            // Assert
            Assert.IsNotNull(okResult);
        }

        [TestMethod]
        public void GetLabelsLibraryTest()
        {
            // Act
            var okResult = _controller_lbl.GetLabelsLibrary();

            //First Failure
            //Assert.IsNull(okResult);

            //Assert
            Assert.IsNotNull(okResult);
        }
    }
}
