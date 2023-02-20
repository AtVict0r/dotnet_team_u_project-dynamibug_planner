using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateProjectDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        // public string UserId { get; set; } = null!;
        public long? GithubId { get; set; }
    }

    public class UpdateProjectDTO : CreateProjectDTO 
    {
        public long Id { get; set; }
        public bool IsArchived { get; set; }
    }

    public class ProjectDTO : UpdateProjectDTO
    {
        // public UserDTO User { get; set; } = null!;
        public virtual IList<ReportDTO>? Reports { get; set; }
        // public GithubRepositoryDTO Repository { get; set; }
    }
}