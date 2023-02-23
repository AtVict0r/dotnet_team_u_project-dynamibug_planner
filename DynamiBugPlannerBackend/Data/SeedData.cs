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

            // Look for any projects.
            if (context.Projects.Any())
            {
                return;   // DB already has data
            }

            SeedProjects(context);

            SeedReports(context);
        }
    }

    private static void SeedProjects(DatabaseContext context, int size = 5)
    {
        List<ProjectModel> myProjects = new List<ProjectModel>();

        for (int i = 1; i <= size; i++)
        {
            myProjects.Add(
                 new ProjectModel
                 {
                     Name = $"Test Project {i}",
                     Description = $"This is test project {i}"
                 }
            );
        }

        context.AddRange(myProjects);
        context.SaveChanges();
    }

    private static void SeedReports(DatabaseContext context, int size = 5)
    {
        List<ReportModel> myReports = new List<ReportModel>();
        List<BugFixModel> myFixes = new List<BugFixModel>();
        List<CommentModel> myComments = new List<CommentModel>();
        string[] types = { "Bug", "Documentation", "Enhancement", "Help", "Question", "Other" };
        string[] statuses = { "New", "Open", "Active", "Resolved", "Wont Fix", "Archived" };
        string[] priorities = { "Unconfirmed", "Low", "Medium", "High", "Immediate" };

        for (int i = 1; i <= size; i++)
        {
            for (int j = 1; j <= context.Projects.Count(); j++)
            {
                myReports.Add(
                    new ReportModel
                    {
                        Type = types[Random.Shared.Next(types.Length)],
                        Status = statuses[Random.Shared.Next(statuses.Length)],
                        Priority = priorities[Random.Shared.Next(priorities.Length)],
                        Title = $"Test Project {j} Bug Report {i}",
                        Description = $"This is test report {i} for test project {j}",
                        ProjectId = j
                    }
                );

                int count = myReports.Count();
                
                myFixes.Add(
                    new BugFixModel
                    {
                        Html = $"<p>Bug Fix for report {count}<p>",
                        ReportId = count
                    }
                );

                myComments.Add(
                     new CommentModel
                     {
                         Comment = $"This is a comment for bug report {count}",
                         ReportId = count
                     }
                );
            }
        }

        context.AddRange(myReports);
        context.AddRange(myFixes);
        context.AddRange(myComments);
        context.SaveChanges();
    }
}