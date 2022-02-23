using System.Text.Json.Serialization;
namespace IssueTracker.Models
{
    public class User
    {
        [JsonPropertyName("id")]
        public int Id { set; get; }
        [JsonPropertyName("name")]
        public string Name { set; get; }
        [JsonPropertyName("role")]
        public string Role { set; get; }
        [JsonPropertyName("emailAddr")]
        public string EmailAddr { set; get; }
        [JsonPropertyName("pwd")]
        public string Password { set; get; }

    }
}
