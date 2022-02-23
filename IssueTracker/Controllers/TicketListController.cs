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
using IssueTracker.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class TicketListController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _config;

        public TicketListController(IConfiguration config, ILogger<LoginController> logger)
        {
            _logger = logger;
            _config = config;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        [Authorize]
        [Route("fetchall")]
        public IActionResult GetList()
        {
            List<Ticket> items = new List<Ticket>();
            using (StreamReader r = new StreamReader("./Data/Tickets.json"))
            {
                string json = r.ReadToEnd();
                items = JsonSerializer.Deserialize<List<Ticket>>(json);
            }
            return new ObjectResult(items);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Route("create")]
        [Authorize]
        public IActionResult Post([FromBody] Ticket ticket)
        {
            List<Ticket> items = new List<Ticket>();
            using (StreamReader r = new StreamReader("./Data/Tickets.json"))
            {
                string json = r.ReadToEnd();
                items = JsonSerializer.Deserialize<List<Ticket>>(json);
            }
            items.Add(ticket);
            using (StreamWriter r = new StreamWriter("./Data/Tickets.json"))
            {
                string json = JsonSerializer.Serialize(items);
                r.Write(json);
            }

            return new ObjectResult(new Response { Status = "Success", Message = "Ticket created!" });
        }

        // PATCH api/<ValuesController>
        [HttpPatch]
        [Route("update")]
        [Authorize]
        public IActionResult PatchList([FromBody] int tId)
        {
            List<Ticket> items = new List<Ticket>();
            using (StreamReader r = new StreamReader("./Data/Tickets.json"))
            {
                string json = r.ReadToEnd();
                items = JsonSerializer.Deserialize<List<Ticket>>(json);
            }
            Ticket target = items.Find(el => el.Id == tId);
            target.Status = "solved";
            using (StreamWriter r = new StreamWriter("./Data/Tickets.json"))
            {
                string json = JsonSerializer.Serialize(items);
                r.Write(json);
            }

            return new ObjectResult(new Response { Status = "Success", Message = "Ticket created!" });
        }
    }
}
