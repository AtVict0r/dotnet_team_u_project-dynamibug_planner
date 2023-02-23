using System.Runtime.CompilerServices;
using System;
using System.ComponentModel.DataAnnotations;
using DynamiBugPlannerBackend.Data;

namespace DynamiBugPlannerBackend.Models
{
    public class CreateCommentDTO 
    {
        [Required]
        [DataType(DataType.MultilineText)]
        public string Comment { get; set; } = null!;
        // public string UserId { get; set; } = null!;
        public long BugId { get; set; }
    }

    public class CommentDTO : CreateCommentDTO
    {
        public long Id { get; }
        public DateTime CreateDate { get; set; } = DateTime.Now!;
        // public UserModel User { get; set; } = null!;
        public ReportDTO Bug { get; } = null!;
    }
}