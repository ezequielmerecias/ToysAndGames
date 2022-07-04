using Microsoft.AspNetCore.Mvc;
using Model;

namespace APIGateway.Services
{
    public interface IProductServices
    {
        List<Product> Get();
        Product Insert(Product product);
        Product Update(Product product);
        void Delete(int id);
    }
}
