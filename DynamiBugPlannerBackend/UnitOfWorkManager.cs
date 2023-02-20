using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Interface;

namespace DynamiBugPlannerBackend 
{
    public class UnitOfWorkManager : IUnitOfWork
    {
        private readonly DatabaseContext _context;
        private IGenericRepository<ProjectModel> _projects = null!;
        private IGenericRepository<ReportModel> _reports = null!;
        private IGenericRepository<BugFixModel> _plans = null!;
        private IGenericRepository<CommentModel> _comments = null!;
        

        public UnitOfWorkManager(DatabaseContext context = null!)
        {
            _context = context;
        }

        public IGenericRepository<ProjectModel> Projects => _projects ?? new GenericRepository<ProjectModel>(_context);

        public IGenericRepository<ReportModel> Reports => _reports ?? new GenericRepository<ReportModel>(_context);

        public IGenericRepository<BugFixModel> Plans => _plans ?? new GenericRepository<BugFixModel>(_context);

        public IGenericRepository<CommentModel> Comments => _comments ?? new GenericRepository<CommentModel>(_context);

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void  Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}