using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class CommentModel 
    {
        [Key]
        public long Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime CreateDate { get; set; } = DateTime.Now!;

        // [ForeignKey(nameof(User))]
        // public string UserId { get; set; } = null!;
        // public UserModel User { get; set; } = null!;

        [ForeignKey(nameof(Bug))]
        public long BugId { get; set; }
        public ReportModel Bug { get; set; } = null!;
    }
}