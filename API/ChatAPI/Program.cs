using ChatAPI.GraphQL;
using ChatAPI.Infrastructure.Repository;
using ChatAPI.Services.Service;
using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IMessageService, MessageService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IChannelService, ChannelService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IMessageRepository, MessageRepository>();
builder.Services.AddTransient<IChannelRepository, ChannelRepository>();
builder.Services.AddTransient<ILoginService, LoginService>();


var client = new MongoClient("mongodb://localhost:27017");
builder.Services.AddSingleton<IMongoClient>(client);
builder.Services.AddScoped(service =>
{
    return client.GetDatabase("Chat");
});
builder.Services.AddMemoryCache();

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>()
    .AddSubscriptionType<Subscription>()
    .AddInMemorySubscriptions();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                      });
});

builder.Services.AddAuthentication().AddJwtBearer(_ =>
{
    _.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = "localhost",
        ValidAudience = "localhost",
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvReader.GetStringValue("JWT_SECRET"))),
    };
});

DotEnv.Load();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.UseWebSockets();

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();
