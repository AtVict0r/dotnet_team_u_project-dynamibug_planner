using Microsoft.EntityFrameworkCore;

namespace DynamiBugPlannerBackend.Data 
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) 
            : base(options) {}

        public DbSet<ProjectModel> Projects { get; set; } = null!;

        public DbSet<ReportModel> BugReports { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            builder.Entity<ProjectModel>().HasData(
                new ProjectModel
                {
                    Id = 1,
                    Name = "Test Project",
                    Description = "This is a test project"
                },
                new ProjectModel
                {
                    Id = 2,
                    Name = "Test Project 2",
                    Description = "This is the second test project"
                },
                new ProjectModel
                {
                    Id = 3,
                    Name = "Test Project 3",
                    Description = "This is the third project"
                }
            );

             builder.Entity<ReportModel>().HasData(
                new ReportModel
                {
                    Id = 1,
                    Type = "Bug Report",
                    Title = "Test Project 1 Bug Report",
                    Description = "This is a test report for test project 1",
                    ProjectId = 1
                },
                new ReportModel
                {
                    Id = 2,
                    Type = "Bug Report",
                    Title = "Test Project 1 Bug Report 2",
                    Description = "This is another test report for test project 1",
                    ProjectId = 1
                },
                new ReportModel
                {
                    Id = 3,
                    Type = "Bug Report",
                    Title = "Test Project 2 Bug Report",
                    Description = "This is a test report for test project 2",
                    ProjectId = 2
                },
                new ReportModel
                {
                    Id = 4,
                    Type = "Bug Report",
                    Title = "Test Project 3 Bug Report 1",
                    Description = "This is a test report for test project 3",
                    ProjectId = 3
                }
            );
        }
    }
}