using System;
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

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        public UserModel User { get; set; } = null!;

        [ForeignKey(nameof(Report))]
        public long ReportId { get; set; }
        public ReportModel Report { get; set; } = null!;
    }
}