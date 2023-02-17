using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class ReportModel
    {
        [Key]
        public long Id { get; set; }

        public string Type { get; set; } = null!;

        public string Status { get; set; } = "New";
        
        public string Priority { get; set; } = "Unconfirmed";

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public bool isArchived { get; set; } = false;
        
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public DateTime? ModifyDate { get; set; }

        // [ForeignKey(nameof(User))]
        // public UserModel User { get; set; }
        // public string UserName { get; set; }

        [ForeignKey(nameof(Project))]
        public ProjectModel Project { get; set; }
        public int ProjectId { get; set; }
    }
}