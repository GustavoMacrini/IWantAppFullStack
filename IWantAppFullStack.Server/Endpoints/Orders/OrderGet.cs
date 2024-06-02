using IWantApp.Domain.Orders;
using IWantApp.Endpoints.Products;

namespace IWantApp.Endpoints.Orders;

public class OrderGet
{
    public static string Template => "/orders/{id:guid}";
    public static string[] Methods => new string[] { HttpMethod.Get.ToString() };
    public static Delegate Hendle => Action;

    [Authorize]
    public static async Task<IResult> Action([FromRoute]Guid id, HttpContext http, ApplicationDbContext context)
    {
        var clientId = http.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
        var clientName = http.User.Claims.First(c => c.Type == "Name");
        var employeeCode = http.User.Claims.FirstOrDefault(c => c.Type == "EmployeeCode");

        var order = await context.Orders.Include(o => o.Products).Where(p => p.Id == id && (p.ClientId == clientId.Value || employeeCode != null)).FirstOrDefaultAsync();

        if (order == null)
        {
            return Results.Forbid();
        }

        List<OrderProduct> products = new List<OrderProduct>();
        foreach (var product in order.Products)
        {
            products.Add(new OrderProduct(product.Id, product.Name));
        }

        OrderResponse response = new OrderResponse(order.Id, clientName.Value, products, order.Total, order.DeliveryAddress);

        return Results.Ok(response);
    }
}
