namespace IWantApp.Endpoints.Products;

public class ProductSoldGet
{
    public static string Template => "/products/sold";
    public static string[] Methods => new string[] { HttpMethod.Get.ToString() };
    public static Delegate Hendle => Action;

    [Authorize(Policy = "EmployeePolicy")]
    public static async Task<IResult> Action(QueryAllProductsSold query, int page = 1, int rows = 10)
    {
        var result = await query.Execute(page, rows);
        return Results.Ok(result);
    }
}
