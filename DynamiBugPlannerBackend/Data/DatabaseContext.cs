using Microsoft.EntityFrameworkCore;

namespace DynamiBugPlannerBackend.Data 
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) 
            : base(options) {}

        // public DbSet<UserModel> Users { get; } = null!;

        public DbSet<ProjectModel> Projects { get; set; } = null!;

        public DbSet<ReportModel> BugReports { get; set; } = null!;

        public DbSet<BugFixModel> Plans { get; set; } = null!;

        public DbSet<CommentModel> Comments { get; set; } = null!;
        
    }
}