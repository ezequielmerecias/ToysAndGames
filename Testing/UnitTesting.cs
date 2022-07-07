using APIGateway.Controllers;
using APIGateway.Services;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Moq;

namespace Testing
{
    
    public class UnitTesting
    { 
        //private readonly ApplicationDbContext _context;
        public UnitTesting()
        {
            //var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            //    .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            //    .Options;

            //_context = new ApplicationDbContext(options);
            //_context.Database.EnsureCreated();
        }

        [Fact]
        public void GetAllNotNull_And_IsOkResult()
        {
            //Arrange
            var mockService = new Mock<IProductServices>();
            mockService.Setup(s => s.Get())
                        .Returns(new List<Product>
                        {
                            new Product()
                            {
                                Id = 1,
                                Name = "Product 1",
                                AgeRestriction = 3,
                                Company="Mattel",
                                Price = 20.0M
                            },
                            new Product()
                            {
                                Id = 1,
                                Name = "Product 2",
                                AgeRestriction = 10,
                                Company="Mattel",
                                Price = 30M
                            }
                        });
            var controller = new ProductsController(mockService.Object);

            //Act
            var actionResult = (OkObjectResult)controller.Get();
            //Assert
            Assert.IsType<List<Product>>(actionResult.Value);
            Assert.Equal(200, actionResult.StatusCode);
        }

        [Fact]
        public void ValidateInsertCorrectlyOneObjectProduct_And_ReturnIdNotZero()
        {
            //Arrange
            Product product = new Product()
            {
                Id = 1,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            };
            var mockService = new Mock<IProductServices>();
            mockService.Setup(s => s.Insert(It.IsAny<Product>())).Returns(product);
            var controller = new ProductsController(mockService.Object);

            //Act
            var actionResult = (OkObjectResult)controller.Upsert(new Product()
            {
                Id=0, Company="Mattel", Name="Nuevo", Price=10.0M
            });

            //Asert
            Assert.IsType<Product>(actionResult.Value);
            Assert.NotEqual(0, (actionResult.Value as Product).Id);


        }

        [Fact]
        public void ValidateUpdateProduct_And_ReturnEqualId()
        {
            //Arrange
            Product product = new Product()
            {
                Id = 1,
                AgeRestriction = 10,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            };
            var mockService = new Mock<IProductServices>();
            mockService.Setup(s => s.Update(It.IsAny<Product>())).Returns(product);
            var controller = new ProductsController(mockService.Object);

            //Act
            var actionResult = (OkObjectResult)controller.Upsert(new Product()
            {
                Id = 1,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            });

            //Assert
            Assert.IsType<Product>(actionResult.Value);
            Assert.Equal(1, (actionResult.Value as Product).Id);
            Assert.Equal(10, (actionResult.Value as Product).AgeRestriction);
        }

        [Fact]
        public void ValidateDeleteProduct_And_ReturnEmpty()
        {
            //Arrange
            var mockService = new Mock<IProductServices>();
            mockService.Setup(s => s.Delete(It.IsAny<int>()));
            var controller = new ProductsController(mockService.Object);

            //Act
            var actionResult = (NoContentResult)controller.Delete(id: 1);

            //Assert
            Assert.Equal(204, actionResult.StatusCode);
        }

        [Fact]
        public void ValidateNullProductInUpsert()
        {
            //Arrange
            Product? product = null;
            var mockService = new Mock<IProductServices>();
            mockService.Setup(s => s.Update(It.IsAny<Product>()));
            var controller = new ProductsController(mockService.Object);

            //Act
            var actionResult = (BadRequestResult)controller.Upsert(product);

            //Assert
            Assert.Equal(400, actionResult.StatusCode);
        }
    }

  
}