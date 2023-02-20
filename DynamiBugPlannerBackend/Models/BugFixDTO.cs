using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DynamiBugPlannerBackend.Data;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateBugFixDTO
    {
        public string Html { get; set; } = null!;
        public long BugId { get; set; }
    }

    public class BugFixDTO : CreateBugFixDTO
    {
        public long Id { get; set; }

        public ReportDTO Bug { get; set; } = null!;
    }
}