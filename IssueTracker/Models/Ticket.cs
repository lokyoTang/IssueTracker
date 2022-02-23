using System.Text.Json.Serialization;
namespace IssueTracker.Models
{
    public class Ticket
    {
        [JsonPropertyName("id")]
        public int Id { set; get; }
        [JsonPropertyName("title")]
        public string Title { set; get; }
        [JsonPropertyName("type")]
        public string Type { set; get; }
        [JsonPropertyName("status")]
        public string Status { set; get; }
        [JsonPropertyName("owner")]
        public string Owner { set; get; }
        [JsonPropertyName("summary")]
        public string Summary { set; get; }
        [JsonPropertyName("description")]
        public string Description { set; get; }
    }
}
