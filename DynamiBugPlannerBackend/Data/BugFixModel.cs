using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class BugFixModel
    {
        public long Id { get; set; }

        public string Html { get; set; } = null!;

        //[ForeignKey("BugId")]
        //public ReportModel Bug { get; set; }
        public long BugId { get; set; }
    }
}