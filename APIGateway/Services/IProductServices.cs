using Microsoft.AspNetCore.Mvc;
using Model;

namespace APIGateway.Services
{
    public interface IProductServices
    {
        List<Product> GetAll();
        Product Get(int id);
        Product Insert(Product product);
        Product Update(Product product);
        void Delete(int id);
    }
}
