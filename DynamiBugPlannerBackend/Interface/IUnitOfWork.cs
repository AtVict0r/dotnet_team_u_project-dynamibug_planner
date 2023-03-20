using DynamiBugPlannerBackend.Data;

namespace DynamiBugPlannerBackend.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<ProjectModel> Projects { get; }
        IGenericRepository<ReportModel> Reports { get; }
        IGenericRepository<BugFixModel> Plans { get; }
        IGenericRepository<CommentModel> Comments { get; }
        IGenericRepository<UserModel> Users { get; }
        Task Save();
    }
}