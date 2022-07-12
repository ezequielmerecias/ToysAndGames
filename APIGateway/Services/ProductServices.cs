using DataAccess;
using Model;

namespace APIGateway.Services
{
    public class ProductServices : IProductServices
    {
        private readonly ApplicationDbContext db;
        public ProductServices(ApplicationDbContext db)
        {
            this.db = db;
        }

        public List<Product> GetAll()
        {
            return db.Products.ToList();
        }

        public Product Get(int id)
        {
            return db.Products.Where(q => q.Id == id).FirstOrDefault();
        }

        public Product Insert(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return product;
        }

        public Product Update(Product product)
        {
            db.Products.Update(product);
            db.SaveChanges();
            return product;
        }

        public void Delete(int id)
        {
            var p = db.Products.FirstOrDefault(p => p.Id == id);
            db.Products.Remove(p);
            db.SaveChanges();
        }
    }
}
