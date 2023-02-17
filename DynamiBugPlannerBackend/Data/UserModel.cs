
namespace DynamiBugPlannerBackend.Data
{
    public class UserModel 
    {
        public string Id { get; } = null!;
        public string? UserName { get; }
        private string? NormalizedUserName { get; }
        public string? Email { get; }
        private string? NormalizedEmail { get; }
        private long EmailConfirmed { get; }
        private string? PasswordHash { get; }
        private string? SecurityStamp { get; }
        private string? ConcurrencyStamp { get; }
        public string? PhoneNumber { get; }
        private long PhoneNumberConfirmed { get; }
        private long TwoFactorEnabled { get; }
        private string? LockoutEnd { get; }
        private long LockoutEnabled { get; }
        private long AccessFailedCount { get; }
    }
}