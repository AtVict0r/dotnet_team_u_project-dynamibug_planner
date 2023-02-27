using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DynamiBugPlannerBackend.Data;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateBugFixDTO
    {
        public string Html { get; set; } = null!;
        public long ReportId { get; set; }
        // public long UserId { get; set; }
    }

    public class UpdateBugFixDTO
    {
        public string Html { get; set; } = null!;
    }

    public class BugFixDTO : CreateBugFixDTO
    {
        public long Id { get; set; }
        // public UserDTO User { get; set; } = null!;
        public ReportDTO Report { get; set; } = null!;
    }
}