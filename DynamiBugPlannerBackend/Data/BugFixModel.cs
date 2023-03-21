using System.Globalization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class BugFixModel
    {
        private long projectId;
        
        [Key]
        public long Id { get; set; }

        public string Html { get; set; } = null!;

        [ForeignKey(nameof(Report))]
        public long ReportId { get; set; }
        public ReportModel Report { get; set; } = null!;

        [ForeignKey(nameof(Project))]
        public long ProjectId { get; set; }
        public ProjectModel Project { get; set; } = null!;
    }
}