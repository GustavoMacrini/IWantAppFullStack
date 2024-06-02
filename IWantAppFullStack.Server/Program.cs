using IWantApp.Domain.Users;
using IWantApp.Endpoints.Categories;
using IWantApp.Endpoints.Clients;
using IWantApp.Endpoints.Employees;
using IWantApp.Endpoints.Orders;
using IWantApp.Endpoints.Products;
using IWantApp.Endpoints.Security;
using IWantAppFullStack.Server.Endpoints.Products;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.SqlClient;
using Serilog;
using Serilog.Sinks.MSSqlServer;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .WriteTo.Console()
        .WriteTo.MSSqlServer(
            context.Configuration["ConnectionString:IWantDb"],
            sinkOptions: new MSSqlServerSinkOptions()
            {
                AutoCreateSqlTable = true,
                TableName = "LogAPI"
            }
        );
});

builder.Services.AddSqlServer<ApplicationDbContext>(
    builder.Configuration["ConnectionString:IWantDb"]);
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequiredLength = 3;
}).AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddScoped<QueryAllUsersWithClaimName>();
builder.Services.AddScoped<QueryAllProductsSold>();
builder.Services.AddScoped<UserCreator>();

builder.Services.AddAuthorization(options =>
{
    /*Colocar authorization por padrão em todos os endpoints*/
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
    .RequireAuthenticatedUser()
    .Build();
    options.AddPolicy("EmployeePolicy", p => p.RequireAuthenticatedUser().RequireClaim("EmployeeCode"));
    options.AddPolicy("CpfPolicy", p => p.RequireAuthenticatedUser().RequireClaim("Cpf"));
});
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["JwtBearerTokenSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtBearerTokenSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtBearerTokenSettings:SecretKey"]))
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(policy =>
//    {
//        policy.AllowAnyOrigin()
//        .AllowAnyMethod()
//        .AllowAnyHeader();
//    });
//});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors();

app.MapMethods(CategoryPost.Template, CategoryPost.Methods, CategoryPost.Hendle);
app.MapMethods(CategoryGetAll.Template, CategoryGetAll.Methods, CategoryGetAll.Hendle);
app.MapMethods(CategoryPut.Template, CategoryPut.Methods, CategoryPut.Hendle);
app.MapMethods(EmployeePost.Template, EmployeePost.Methods, EmployeePost.Hendle);
app.MapMethods(EmployeeGetAll.Template, EmployeeGetAll.Methods, EmployeeGetAll.Hendle);
app.MapMethods(TokenPost.Template, TokenPost.Methods, TokenPost.Hendle);
app.MapMethods(ProductPost.Template, ProductPost.Methods, ProductPost.Hendle);
app.MapMethods(ProductGetAll.Template, ProductGetAll.Methods, ProductGetAll.Hendle);
app.MapMethods(ProductGetById.Template, ProductGetById.Methods, ProductGetById.Hendle);
app.MapMethods(ProductGetShowcase.Template, ProductGetShowcase.Methods, ProductGetShowcase.Hendle);
app.MapMethods(ClientPost.Template, ClientPost.Methods, ClientPost.Hendle);
app.MapMethods(ClientGet.Template, ClientGet.Methods, ClientGet.Hendle);
app.MapMethods(OrderPost.Template, OrderPost.Methods, OrderPost.Hendle);
app.MapMethods(OrderGet.Template, OrderGet.Methods, OrderGet.Hendle);
app.MapMethods(ProductSoldGet.Template, ProductSoldGet.Methods, ProductSoldGet.Hendle);
app.MapMethods(ProductDelete.Template, ProductDelete.Methods, ProductDelete.Hendle);


app.UseExceptionHandler("/error");
app.Map("/error", (HttpContext http) =>
{
    var error = http.Features?.Get<IExceptionHandlerFeature>().Error;

    if (error != null)
    {
        if (error is SqlException)
        {
            return Results.Problem(title: "Database out", statusCode: 500);
        }
        else if (error is BadHttpRequestException)
        {
            return Results.Problem(title: "Error to convert date to other type. See all the information sent", statusCode: 500);
        }
    }

    return Results.Problem(title: "An error ocurred", statusCode: 500);
});

app.Run();
