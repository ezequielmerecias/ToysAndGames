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
            var products = productServices.GetAll();
            return Ok(products);
        }

        [HttpGet("id/{id}")]
        public IActionResult Get([FromRoute]int id)
        {
            var product = productServices.Get(id);
            return Ok(product);
        }

        [HttpPut]
        public IActionResult Upsert(Product product)
        {
            if (product == null)
                return BadRequest();

            if (product.Id == 0)
            {
                var newProduct = productServices.Insert(product);
                return Ok(newProduct);  
            }
            else
            {
                var productUpdated = productServices.Update(product);
                return Ok(productUpdated);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            if (id == 0)
                return NotFound();
            productServices.Delete(id);
            return NoContent();
        }
    }
}
