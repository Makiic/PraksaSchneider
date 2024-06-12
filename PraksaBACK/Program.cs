using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PraksaBACK.Contexts;
using PraksaBACK.MailUtil;

var builder = WebApplication.CreateBuilder(args);

// Dodavanje servisa u kontejner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddScoped<IMailService, MailService>();
// Dodavanje CORS servisa
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


// Konfiguracija PostgreSQL veze
builder.Services.AddDbContext<EventPlannerContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("EventPlannerContext")));

var app = builder.Build();

// Konfiguracija HTTP zahtjeva
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Dodavanje CORS middleware-a
app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
