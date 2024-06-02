namespace IWantApp.Endpoints.Products;

public record ProductSoldResponse(Guid Id, string Name, decimal Price, int Amount);
