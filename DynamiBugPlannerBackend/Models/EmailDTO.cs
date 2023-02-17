namespace DynamiBugPlannerBackend.Models
{
    public class EmailModelDTO
    {
        public string SenderName { get; set; }

        public string SenderEmail { get; set; }

        public string MessageTitle { get; set; }
        
        public string MessageBody { get; set; }

        // [ForeignKey(nameof(User))]
        // public UserModel User { get; set; }
        // public string UserName { get; set; }
    }
}