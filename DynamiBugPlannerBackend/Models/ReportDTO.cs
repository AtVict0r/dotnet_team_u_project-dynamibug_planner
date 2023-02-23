using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateReportDTO
    {        
        // public string UserId { get; set; } = null!;
        [Required]
        public string Type { get; set; } = null!;
        [Required]
        public string Title { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        public long ProjectId { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now!;
    }

    public class UpdateReportDTO 
    {  
        public string Type { get; set; } = null!;
        public string Status { get; set; } = null!;        
        public string Priority { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ModifyDate { get; set; } = DateTime.Now!;
    }

    public class ReportDTO : CreateReportDTO
    {
        public long Id { get; set; }
        public string Status { get; set; } = null!;
        public string Priority { get; set;  } = null!;

        public DateTime ModifyDate { get; } = DateTime.Now!;
                
        // public UserDTO User { get; set; }
        public ProjectDTO Project { get; set; } = null!;

        public BugFixDTO? Plan { get; set; }
        public virtual IList<CommentDTO>? Comments { get; set; }
    }
}