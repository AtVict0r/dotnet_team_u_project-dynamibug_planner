using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateReportDTO
    {
        [Required]
        public string Type { get; set; } = null!;
        [Required]
        public string Title { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        // public string UserId { get; set; } = null!;
        public long ProjectId { get; set; }

    }

    public class UpdateReportDTO : CreateReportDTO
    {
        public long Id { get; set; }
        public string Status { get; set; } = null!;        
        public string Priority { get; set; } = null!;
        public DateTime ModifyDate { get; set; }  = DateTime.Now!;
    }

    public class ReportDTO : CreateReportDTO
    {
        
        public DateTime CreateDate { get; }
        
        // public UserDTO User { get; set; } = null!;
        public ProjectDTO Project { get; set; } = null!;
        public BugFixDTO Plan { get; set; } = null!;
        public virtual IList<CommentDTO>? Comments { get; set; }
    }
}