using APIGateway.Services;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace APIGateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductServices productServices;
        public ProductsController(IProductServices productServices)
        {
            this.productServices = productServices;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var products = productServices.Get();
            return Ok(products);
        }

        [HttpPut]
        public IActionResult Upsert(Product product)
        {
            if(product.Id == 0)
            {
                productServices.Insert(product);
            }
            else
            {
                productServices.Update(product);
            }
            return Ok(product);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            productServices.Delete(id);
            return Ok();
        }
    }
}
