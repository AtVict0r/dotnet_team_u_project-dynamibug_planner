using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{

    [Index("UserName", IsUnique = true)]
    [Index("Email", IsUnique = true)]
    public class UserModel 
    {
        [Key]
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}