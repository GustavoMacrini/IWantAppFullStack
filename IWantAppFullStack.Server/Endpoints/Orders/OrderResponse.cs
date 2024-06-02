namespace IWantApp.Endpoints.Orders;

public record OrderResponse(Guid Id, string ClientName, IEnumerable<OrderProduct> Products, decimal Total, string DeliveryAddress);

public record OrderProduct(Guid Id, string Name);