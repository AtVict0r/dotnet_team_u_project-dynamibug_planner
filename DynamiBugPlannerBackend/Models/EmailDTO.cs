namespace DynamiBugPlannerBackend.Models
{
    public class EmailModelDTO
    {
        public string SenderName { get; set; } = null!;

        public string SenderEmail { get; set; } = null!;

        public string MessageTitle { get; set; } = null!;
        
        public string MessageBody { get; set; } = null!;

        // [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;
        // public UserDTO User { get; set; }
    }
}