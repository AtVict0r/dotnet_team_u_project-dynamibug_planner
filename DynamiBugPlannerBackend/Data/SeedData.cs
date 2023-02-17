using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DatabaseContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<DatabaseContext>>()))
        {
            if (context == null || context.Projects == null)
            {
                throw new ArgumentNullException("Null DatabaseContext");
            }

            // Look for any projcts.
            if (context.Projects.Any())
            {
                return;   // DB has been seeded
            }

            
            List<ProjectModel> myProjects = new List<ProjectModel>();
            List<BugFixModel> myFixs = new List<BugFixModel>();

        
            for(int i = 1; i <= 5; i++)
            {
                myProjects.Add(
                     new ProjectModel
                    {
                        Id = i,
                        Name = $"Test Project {i}",
                        Description = $"This is test project {i}"
                    }
                );
            } 

            context.Projects.AddRange(myProjects);

            context.BugReports.AddRange(
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

            for(int i = 1; i <= 4; i++)
            {
                myFixs.Add(
                     new BugFixModel
                    {
                        Id = i,
                        Html = $"<p>Bug Fix for project {i}<p>",
                        BugId = i
                    }
                );
            } 

            context.Plans.AddRange(myFixs);

            context.SaveChanges();
        }
    }
}