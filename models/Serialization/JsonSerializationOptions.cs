using System.Text.Json;

namespace ReconBank.Models.Serialization
{
    public class JsonSerializationOptions
    {
        public static JsonSerializerOptions GetDefaultOptions() => new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }
}