using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace GologoServer.Middleware
{

    /*
     * This middleware handles the Authorize attribute and will soon handle all policies.
     */
    public class AuthHandler : IAuthorizationMiddlewareResultHandler
    {
        public async Task HandleAsync(RequestDelegate next, HttpContext context, Microsoft.AspNetCore.Authorization.AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            if (context.User.Identity is { IsAuthenticated: false })
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }
            await next(context);
        }
    }

    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var securityToken = jwtUtils.ValidateToken(token);
            if (securityToken is not null)
            {
                context.User = new ClaimsPrincipal(new ClaimsIdentity(securityToken.Claims, "Authorized User"));
            }

            await _next(context);
        }
    }

    public interface IJwtUtils
    {
        public JwtSecurityToken ValidateToken(string token);
    }

    public class JwtUtils : IJwtUtils
    {
        private readonly IAppSettings _appSettings;

        public JwtUtils(IAppSettings appSettings, IConfiguration configuration)
        {
            _appSettings = appSettings;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }


        public JwtSecurityToken ValidateToken(string token)
        {
            if (token == null)
                return null;

            try
            {
                var validatedToken = Authenticate(token);
                return (JwtSecurityToken)validatedToken;
            }
            catch
            {
                return null;
            }
        }

        private SecurityToken Authenticate(string token)
        {
            var validator = new JwtSecurityTokenHandler();

            // These need to match the values used to generate the token
            var validationParameters = new TokenValidationParameters
            {
                ValidIssuer = "localhost",
                ValidAudience = "all",
                //IssuerSigningKey = signingKey.Key,
                ValidateIssuerSigningKey = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SigningCredentials(
						new SymmetricSecurityKey(
							Base64UrlTextEncoder.Decode(
								(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development") ?
								Configuration["JwtConfig:Secret"] :
								Environment.GetEnvironmentVariable(Configuration["JwtConfig:Secret"], EnvironmentVariableTarget.Machine)
								)
							)
						, "HS256", "HS256").Key
			};

            if (validator.CanReadToken(token))
            {
                try
                {
                    _ = validator.ValidateToken(token, validationParameters, out var validatedToken);
                    return validatedToken;
                }
                catch (Exception e)
                {
                    throw e;
                }
            }

            return null;
        }
    }

    public interface IAppSettings
    {
        string Secret { get; }
    }

    public class AppSettings : IAppSettings
    {
        private readonly IConfiguration _config;

        public AppSettings(IConfiguration config)
        {
            _config = config;
            Secret = _config["JwtConfig:Secret"];
        }

        public string Secret { get; }

    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizationPolicy : Attribute, IAuthorizationFilter
    {
        private string _policyName;
        public AuthorizationPolicy(string policyName = "")
        {
            if (string.IsNullOrWhiteSpace(policyName))
            {
                throw new ArgumentException(nameof(policyName));
            }

            _policyName = policyName;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var account = context.HttpContext.User;
            var policyArray = account.Claims.Where(x => x.Type == "policies")?.FirstOrDefault()?.Value;

            //No claims, no policies, or no policies that match the supplied policy are all rejected as a forbidden request. Do not issue an unauthorized request, as it will interfere with our JWT creation pipeline.
            if (policyArray is null or { Length: <= 0 } || policyArray.Split(", ").All(p => p != _policyName))
                context.Result = new ForbidResult();
        }
    }
}