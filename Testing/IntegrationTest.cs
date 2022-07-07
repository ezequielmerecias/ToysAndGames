using DataAccess;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testing
{
    
    public class IntegrationTest
    {
        const string API = "api/Products/";

        [Fact]
        public void TestingUpsertNotNull_200Code_NotEqualID()
        {
            //Arrange
            WebApplication<Program> web = new WebApplication<Program>();
            var client = web.CreateClient();
            Product p = new Product()
            {
                Id = 0,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            };
            var json = JsonConvert.SerializeObject(p);
            var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

            //Act
            var resp = client.PutAsync(API, stringContent).Result;


            var obj = resp.Content.ReadAsStringAsync().Result;
            var pResp = JsonConvert.DeserializeObject<Product>(obj);

            //Assert
            Assert.NotNull(resp.Content);
            Assert.Equal(200, (int)resp.StatusCode);
            Assert.NotEqual(0, pResp.Id);
        }

        [Fact]
        public void TestingUpsert_And_DeleteProductInMemory()
        {
            //Arrange
            var web = new WebApplication<Program>();
            var client = web.CreateClient();
            Product p = new Product()
            {
                Id = 0,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            };

            var json = JsonConvert.SerializeObject(p);
            var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            
            //1st Act
            var respInsert = client.PutAsync(API, stringContent).Result;

            var obj = respInsert.Content.ReadAsStringAsync().Result;
            var pResp = JsonConvert.DeserializeObject<Product>(obj);

            //2nd Act
            var respDelete = client.DeleteAsync($"{API}?id={pResp.Id}").Result;

            //Assert
            Assert.Equal(204, (int)respDelete.StatusCode);
            Assert.Null(respDelete.Content);
        }

        [Fact]
        public void TestingUpdateOneProduct()
        {
            //Arrange
            var web = new WebApplication<Program>();
            var client = web.CreateClient();
            Product p = new Product()
            {
                Id = 0,
                Company = "Mattel",
                Name = "Nuevo",
                Price = 10.0M
            };
            var json = JsonConvert.SerializeObject(p);
            var stringContent = new StringContent(json, Encoding.UTF8, "application/json");

            //1st Act
            var respInsert = client.PutAsync(API, stringContent).Result;

            var obj = respInsert.Content.ReadAsStringAsync().Result;
            var pResp = JsonConvert.DeserializeObject<Product>(obj);

            //Modified the inserted value
            pResp.Company = "Hasbro";

            json = JsonConvert.SerializeObject(pResp);
            stringContent = new StringContent(json, Encoding.UTF8, "application/json");

            //2nd Act
            var respUpdate = client.PutAsync(API, stringContent).Result;

            var objUpdated = respUpdate.Content.ReadAsStringAsync().Result;
            var pRespUpdated = JsonConvert.DeserializeObject<Product>(objUpdated);

            //Assert
            Assert.NotNull(respUpdate.Content);
            Assert.Equal(200, (int)respUpdate.StatusCode);
            Assert.Equal("Hasbro", pRespUpdated.Company);
            Assert.Equal(pResp.Id, pRespUpdated.Id);
        }
    }

    class WebApplication<TProgram> : WebApplicationFactory<TProgram> where TProgram : Program
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            return base.CreateHost(builder);
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);
            builder.ConfigureServices(s =>
            {
                var service = s.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                if (service != null)
                    s.Remove(service);
                s.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });
            });
        }
    }
}
