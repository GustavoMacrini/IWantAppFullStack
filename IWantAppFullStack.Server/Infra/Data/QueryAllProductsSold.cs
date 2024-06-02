using Dapper;
using IWantApp.Endpoints.Products;
using Microsoft.Data.SqlClient;

namespace IWantApp.Infra.Data;

public class QueryAllProductsSold
{
    private readonly IConfiguration configuration;

    public QueryAllProductsSold(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public async Task<IEnumerable<ProductSoldResponse>> Execute(int page, int rows)
    {
        var db = new SqlConnection(configuration["ConnectionString:IWantDb"]);
        var query =
            @"
            SELECT 
                c.Id,
                c.Name,
                c.Price,
                COUNT(c.id) as Amount
            FROM 
                OrderProducts a
            INNER JOIN Orders b
                ON a.OrdersId = b.Id
            INNER JOIN Products c 
                ON a.ProductsId = c.Id
            GROUP BY c.Id, c.Name, c.Price
            ORDER BY Amount DESC
            OFFSET (@page -1) * @rows ROWS FETCH NEXT @rows ROWS ONLY";

        return await db.QueryAsync<ProductSoldResponse>(query, new { page, rows });

    }
}
