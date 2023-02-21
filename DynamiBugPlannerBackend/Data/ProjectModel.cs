using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class ProjectModel 
    {
        [Key]
        public long Id { get; set; }
        [Column(TypeName = "VARCHAR(255)")]
        public string Name { get; set; } = null!;

        [Column(TypeName = "VARCHAR(255)")]
        public string? Description { get; set; }

        [Column(TypeName = "VARCHAR(5)")]
        public bool IsArchived { get; set; } 

        // [ForeignKey(nameof(User))]
        // public string? UserId { get; set; }
        // public UserModel User { get; set; } = null!;

        // [ForeignKey(nameof(Github))]        
        // public long? GithubId { get; set; }
        // public GithubRepositoryModel Repository { get; set; } = null!;

        public virtual IList<ReportModel>? Reports { get; set; }
    }
}