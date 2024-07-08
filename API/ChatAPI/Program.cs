using ChatAPI.GraphQL;
using ChatAPI.Infrastructure.Repository;
using ChatAPI.Services.Service;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;

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

var client = new MongoClient("mongodb://localhost:27017");
builder.Services.AddSingleton<IMongoClient>(client);
builder.Services.AddScoped(service =>
{
    return client.GetDatabase("Chat");
});

builder.Services
    .AddGraphQLServer()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();
