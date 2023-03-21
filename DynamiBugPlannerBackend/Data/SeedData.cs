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

            SeedUsers(context);

            SeedProjects(context);

            SeedReports(context);
        }
    }

    private static void SeedUsers(DatabaseContext context, int size = 5)
    {
        List<UserModel> myUsers = new List<UserModel>();
        string[] roles = { "user", "manager" };
        string[] names = { "Markus", "Nia", "Natalia", "Joyce", "Gianna", "Lucy", "Landon", "Tony", "Sienna", "Elijah", "Krista", "Jaelyn", "Chandler", "Rosario", "Sherman", "Barry", "Mcknight", "Cohen", "Sanders", "Leon", "Willis", "Griffith", "Li", "Wyatt" };

        myUsers.Add(
                 new UserModel
                 {
                     Role = "admin",
                     UserName = "Admin",
                     Email = "dynamibugplanner@outlook.com",
                     FirstName = "John",
                     LastName = "One",
                     Password = "password",
                 }
        );

        myUsers.Add(
            new UserModel
            {
                Role = "manager",
                UserName = "Manager",
                Email = "dynamibugplanner@outlook.com",
                FirstName = "John",
                LastName = "Two",
                Password = "password",
            }
        );

        myUsers.Add(
            new UserModel
            {
                Role = "user",
                UserName = "User",
                Email = "dynamibugplanner@outlook.com",
                FirstName = "John",
                LastName = "Three",
                Password = "password",
            }
       );

        for (int i = 4; i <= size + 3; i++)
        {
            string firstName = names[Random.Shared.Next(names.Length)];
            string lastName = names[Random.Shared.Next(names.Length)];
            string userName = lastName[0] + firstName + i;

            myUsers.Add(
                 new UserModel
                 {
                     Role = roles[Random.Shared.Next(roles.Length)],
                     FirstName = firstName,
                     LastName = lastName,
                     UserName = userName,
                     Email = $"{userName}@example.com",
                     Password = firstName + lastName[0] + i,
                 }
            );
        }

        context.AddRange(myUsers);
        context.SaveChanges();
    }

    private static void SeedProjects(DatabaseContext context, int size = 10)
    {
        List<ProjectModel> myProjects = new List<ProjectModel>();
        List<UserModel> admins = context.Users.ToList().FindAll(u => !u.Role.Contains("user"));

        for (int i = 1; i <= size; i++)
        {
            myProjects.Add(
                 new ProjectModel
                 {
                     Name = $"Test Project {i}",
                     Description = $"This is test project {i}",
                     UserId = admins[Random.Shared.Next(admins.Count())].Id,
                     IsArchived = Random.Shared.Next(size / 3) == 1,
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
        List<UserModel> users = context.Users.ToList();
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
                        ProjectId = j,
                        UserId = users[Random.Shared.Next(users.Count())].Id,
                    }
                );

                int count = myReports.Count();

                myFixes.Add(
                    new BugFixModel
                    {
                        Html = $"<p>Bug Fix for report {count}<p>",
                        ReportId = count,
                        ProjectId = j
                    }
                );

                for (int k = 1; k <= (size / 2 + 3); k++)
                {
                    myComments.Add(
                     new CommentModel
                     {
                         Comment = $"This is comment {k} for bug report {count}",
                         ReportId = count,
                         UserId = users[Random.Shared.Next(users.Count())].Id,
                     }
                    );
                }
            }
        }

        context.AddRange(myReports);
        context.AddRange(myFixes);
        context.AddRange(myComments);
        context.SaveChanges();
    }
}