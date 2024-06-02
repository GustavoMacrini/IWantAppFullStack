using IWantApp.Endpoints.Products;

namespace IWantAppFullStack.Server.Endpoints.Products
{
    public class ProductDelete
    {
        public static string Template => "/api/products/{id:guid}";
        public static string[] Methods => new string[] { HttpMethod.Delete.ToString() };
        public static Delegate Hendle => Action;

        [Authorize(Policy = "EmployeePolicy")]
        public static async Task<IResult> Action([FromRoute] Guid id, ApplicationDbContext context)
        {
            Product product = await context.Products.Include(p => p.Category).Where(p => p.Id == id).FirstOrDefaultAsync();
            
            if(product == null)
            {
                return Results.BadRequest("Product not found");
            }

            context.Products.Remove(product);
            context.SaveChanges();
            return Results.Ok(product);
        }
    }
}
