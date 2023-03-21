using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Interface;
using AutoMapper;
using DynamiBugPlannerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsersController(IConfiguration config = null!, IUnitOfWork unitOfWork = null!, IMapper mapper = null!)
        {
            _config = config;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Users
        [Authorize(Roles = "admin, manager")]        
        [HttpGet(Name = "GetUsers")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _unitOfWork.Users.GetAll(q => q.Role != "admin");
                var results = _mapper.Map<IList<UserDTO>>(users);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/Users/User
        [Authorize]
        [HttpGet("User", Name = "GetCurrentUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var user = CurrentUser();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/Users/Admins
        [AllowAnonymous]
        [HttpGet("Admins", Name = "GetAdminsUsername")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAdminsUsername()
        {
            try
            {
                var users = await _unitOfWork.Users.GetAll(q => q.Role != "user" && q.Role != null);
                var results = _mapper.Map<IList<AdminUsernameDTO>>(users);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/User/5
        [Authorize(Roles = "admin, manager")] 
        [HttpGet("{id:long}", Name = "GetUserById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserById(long id)
        {
            try
            {
                var user = await _unitOfWork.Users.Get(q => q.Id == id);

                if (user != null)
                {
                    var result = _mapper.Map<UserDTO>(user);
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // GET: api/User/John
        [Authorize(Roles = "admin, manager")]
        [HttpGet("{username:alpha}", Name = "GetUserByUsername")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            try
            {
                var user = await _unitOfWork.Users.Get(q => q.UserName == username);

                if (user != null)
                {
                    var result = _mapper.Map<UserDTO>(user);
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // POST: api/Users/Register
        [AllowAnonymous]
        [HttpPost("Register", Name = "CreateUser")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]      
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = _mapper.Map<UserModel>(userDTO);
                await _unitOfWork.Users.Insert(user);
                await _unitOfWork.Save();
                var result = _mapper.Map<UserDTO>(user);
                
                return CreatedAtRoute("SignInUser", new { UserName = user.UserName, Password = user.Password }, result);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // POST: api/Users/Login
        [AllowAnonymous]
        [HttpPost("Login", Name = "SignInUser")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]            
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]     
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SignInUser([FromBody] LoginUserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _unitOfWork.Users.Get(q => q.UserName == userDTO.UserName || q.Email == userDTO.UserName);

                if (user == null)
                {
                    return NotFound(userDTO);
                }

                if (ComparePasswordValue(userDTO.Password, user.Password))
                {
                    var result = _mapper.Map<UserDTO>(user);
                    return Accepted("Data", new {
                        token = CreateJwtToken(result),
                        username = user.UserName,
                        role = user.Role,
                        name = user.FirstName + " " + user.LastName
                    });
                }

                return Unauthorized(userDTO);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // PUT: api/Users/5
        [Authorize]
        [HttpPut("{id:long}", Name = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateUser (long id, [FromBody] UpdateUserDTO userDTO)
        {
            if (!ModelState.IsValid || id < 2)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // check if user is admin or account owner
                var authorizedUser = CurrentUser();

                if (authorizedUser.Id != id && authorizedUser.Role != "admin")                    
                {
                    return Forbid();
                }

                var user = await _unitOfWork.Users.Get(q => q.Id == id);

                if (user != null)
                {
                    _mapper.Map(userDTO, user);
                    _unitOfWork.Users.Update(user);
                    await _unitOfWork.Save();

                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // PUT: api/Users/Role/5
        [Authorize(Roles = "admin")]
        [HttpPut("Role/{id:long}", Name = "ManageUser")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ManageUser(long id, [FromBody] ManageUserDTO userDTO)
        {
            if (!ModelState.IsValid || id < 2)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _unitOfWork.Users.Get(q => q.Id == id);

                if (user != null)
                {
                    _mapper.Map(userDTO, user);
                    _unitOfWork.Users.Update(user);
                    await _unitOfWork.Save();

                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id:long}", Name = "DeleteUser")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteProject(long id)
        {
            if (id < 2)
            {
                return BadRequest();
            }

            try
            {
                // check if user is admin or account owner
                var authorizedUser = CurrentUser();

                if (authorizedUser.Id != id && authorizedUser.Role != "admin")                    
                {
                    return Forbid();
                }
                
                var user = await _unitOfWork.Users.Get(q => q.Id == id);

                if (user != null)
                {
                    await _unitOfWork.Users.Delete(id);
                    await _unitOfWork.Save();

                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }

        private string CreateJwtToken(UserDTO userDTO)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userDTO.UserName),
                new Claim(ClaimTypes.Role, userDTO.Role),
                new Claim(ClaimTypes.Email, userDTO.Email!),
                new Claim(ClaimTypes.GivenName, userDTO.FullName),
                new Claim(ClaimTypes.PrimarySid, userDTO.Id.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetValue<string>("JwtSettings:Key")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(Convert.ToInt32(_config.GetValue<string>("JwtSettings:Expiration"))),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserIdentityDTO CurrentUser()
        {
            return new UserIdentityDTO(User);
        }

        private bool ComparePasswordValue(string payloadPassword, string userPassword)
        {
            using(var md5 = MD5.Create())
            {
                byte[] passwordHash = md5.ComputeHash(Encoding.UTF8.GetBytes(payloadPassword))!;
                return userPassword == Encoding.UTF8.GetString(passwordHash, 0, passwordHash.Length);                
            }
        }
    }
}
