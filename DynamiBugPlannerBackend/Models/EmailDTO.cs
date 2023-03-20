using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Models
{
    public class EmailDTO
    {
        public string SenderName { get; set; } = null!;

        public string SenderEmail { get; set; } = null!;

        public string MessageTitle { get; set; } = null!;
        
        public string MessageBody { get; set; } = null!;

        public string UserName { get; set; } = null!;
    }
}