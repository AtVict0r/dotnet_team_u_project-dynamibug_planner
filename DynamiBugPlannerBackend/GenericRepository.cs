using System.Linq.Expressions;
using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Interface;
using Microsoft.EntityFrameworkCore;

namespace DynamiBugPlannerBackend
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DatabaseContext _context = null!;
        private readonly DbSet<T> _dbSet = null!;

        public GenericRepository(DatabaseContext context = null!)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task Delete(long id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
                _dbSet.Remove(entity);
        }

        public void DeleteRange(IEnumerable<T> entities = null!)
        {
            _dbSet.RemoveRange(entities);
        }

        public async Task Insert(T entity = null!)
        {
            await _dbSet.AddAsync(entity);
        }

        public async Task InsertRange(IEnumerable<T> entities = null!)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public void Update(T entity = null!)
        {
            _dbSet.Update(entity);
        }

        public void UpdateRange(IEnumerable<T> entities = null!)
        {
            _dbSet.UpdateRange(entities);
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression = null!, List<string>? includes = null)
        {
            IQueryable<T> query = _dbSet;

            if(includes != null)
            {
                foreach(var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            return await query.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public async Task<IList<T>> GetAll(Expression<Func<T, bool>>? expression = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, List<string>? includes = null)
        {
            IQueryable<T> query = _dbSet;

            if(expression != null)
            {
                query = query.Where(expression);
            }

            if(includes != null)
            {
                foreach(var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            if(orderBy != null)
            {
                query = orderBy(query);
            }

            return await query.AsNoTracking().ToListAsync();
        }
    }
}