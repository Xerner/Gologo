using NetCore.AutoRegisterDi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using GologoServer.Middleware;
using Microsoft.Net.Http.Headers;

namespace GologoServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Enabling CORS
            // https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-7.0
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.RegisterAssemblyPublicNonGenericClasses()
                .AsPublicImplementedInterfaces();

            var allowedHosts = builder.Configuration["AllowedHosts"];
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      //policy.WithOrigins("https://localhost:7268", "http://localhost:5115", "http://localhost:4200" , "http://[::1]:4200/");
                                      policy.AllowAnyOrigin()
                                            .WithHeaders(HeaderNames.ContentType);
                                  });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHostFiltering();
            app.UseHttpsRedirection();
            app.UseRouting();
            //app.UseMiddleware<JwtMiddleware>();

            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}