using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using IssueTracker.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config, ILogger<LoginController> logger)
        {
            _logger = logger;
            _config = config;
        }

        /// <summary>
        /// commit credential, and verify
        /// </summary>
        /// <param>Login</param>
        /// <returns></returns>
        [HttpPost]
        [Route("in")]
        public async Task<IActionResult> Login([FromBody] Credential cred)
        {
            try
            {
                List<User> items = new List<User>();
                User currentUser = new User();
                using (StreamReader r = new StreamReader("./Data/Users.json"))
                {
                    string json = r.ReadToEnd();
                    items = JsonSerializer.Deserialize<List<User>>(json);

                    if (!items.Exists(x => (x.EmailAddr == cred.Email) && (x.Password == cred.Password)))
                    {
                        return new ObjectResult(new Response { Status = "Invalid", Message = "Invalid User." });
                    }
                    else
                    {
                        currentUser = items.Find(x => (x.EmailAddr == cred.Email) && (x.Password == cred.Password));
                    }
                }

                //if credential is accepted 
                Claim[] claims = new[] { new Claim(ClaimTypes.Name, cred.Email), new Claim(ClaimTypes.Role, currentUser.Role) };//use this to memerize the account
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);//Scheme is required
                ClaimsPrincipal principal = new ClaimsPrincipal(claimsIdentity);

                //double loginExpireMinute = _config.GetValue<double>("LoginExpireMinute");
                await HttpContext.SignInAsync(principal,
                    new AuthenticationProperties()
                    {
                        IsPersistent = false, //{IsPersistent = false} logout when browser closed；{IsPersistent = true} just as Remember Me
                                              //can also set the time of expiration here, it would override the settings in Startup.cs
                        /* ExpiresUtc = DateTime.UtcNow.AddMinutes(loginExpireMinute) */
                    });

                return new ObjectResult(new Response { Status = "Success", Message = "Login Successfully" });
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        /// <summary>
        /// logout
        /// </summary>
        /// <returns></returns>
        [HttpPatch]
        [Route("out")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync();

                return new ObjectResult(new Response { Status = "Success", Message = "You are sugned out." });
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        /// <summary>
        /// Get role of current user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("role")]
        [Authorize]
        public IActionResult GetRole()
        {
            Response resp = new Response();
            var curClaim = HttpContext.User.Claims.Where(el => el.Type == ClaimTypes.Role);
            if (null != curClaim)
            {
                resp.Message = curClaim.First().Value;
                resp.Status = "Success";
            }
            else
            {
                resp.Message = "Invalid User";
                resp.Status = "Invalid";
            }

            return new ObjectResult(resp);
        }
    }
}
