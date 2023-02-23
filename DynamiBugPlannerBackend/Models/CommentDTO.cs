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
        public DateTime CreateDate { get; set; } = DateTime.Now!;
        // public string UserId { get; set; } = null!;
        public long ReportId { get; set; }
    }

    public class CommentDTO : CreateCommentDTO
    {
        public long Id { get; set; }
        // public UserModel User { get; set; } = null!;
        public ReportDTO Report { get; } = null!;
    }
}