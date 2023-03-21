using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Models
{
    public class ProjectNamesDTO 
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class CreateProjectDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public long UserId { get; set; }
        public long? GithubId { get; set; }
    }

    public class UpdateProjectDTO
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public bool? IsArchived { get; set; } = false!;
    }

    public class ProjectDTO : UpdateProjectDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public UserDTO User { get; set; } = null!;
        public virtual IList<ReportDTO>? Reports { get; set; }
        // public GithubRepositoryDTO Repository { get; set; }
    }
}