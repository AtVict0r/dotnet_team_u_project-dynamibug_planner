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
        public bool IsArchived { get; set; } = false!;

        // [ForeignKey(nameof(User))]
        // public UserModel User { get; set; } = null!;
        // public string? UserName { get; set; }

        // [ForeignKey(nameof(Github))]
        // public GithubModel Github { get; set; } = null!;
        // public long? GithubId { get; set; }
    }
}