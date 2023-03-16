using System;
using System.Net;
using System.Net.Mail;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Interface;
using AutoMapper;
using DynamiBugPlannerBackend.Models;

namespace DynamiBugPlannerBackend.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    // public class EmailsController : ControllerBase
    // {
    //     private readonly IUnitOfWork _unitOfWork;

    //     public EmailsController(IUnitOfWork unitOfWork = null!)
    //     {
    //         _unitOfWork = unitOfWork;
    //     }

    //     // POST: api/Emails
    //     [HttpPost(Name = "PostEmail")]
    //     [ProducesResponseType(StatusCodes.Status400BadRequest)]
    //     [ProducesResponseType(StatusCodes.Status200OK)]
    //     [ProducesResponseType(StatusCodes.Status404NotFound)]
    //     [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //     public async Task<IActionResult> PostEmail([FromBody] EmailDTO emailDTO)
    //     {
    //         if (!ModelState.IsValid)
    //         {
    //             return BadRequest(ModelState);
    //         }

    //         try
    //         {
    //             var user = await _unitOfWork.Users.Get(q => q.UserName == emailDTO.UserName);

    //             if (user != null)
    //             {
    //                 MailMessage message = new MailMessage();
    //                 SmtpClient smtpClient = new SmtpClient();
    //                 message.From = new MailAddress("");
    //                 message.To.Add(user.Email);
    //                 message.Subject = emailDTO.MessageTitle;
    //                 message.IsBodyHtml = true;
    //                 message.Body = "<p>" + "</p>";

    //                 smtpClient.Port = 587;
    //                 smtpClient.Host = "";
    //                 smtpClient.EnableSsl = true;
    //                 smtpClient.UseDefaultCredentials = false;
    //                 smtpClient.Credentials = new NetworkCredential("", "");
    //                 smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
    //                 smtpClient.Send(message);

    //                 return Ok();
    //             }

    //             return NotFound();
    //         }
    //         catch (Exception ex)
    //         {
    //             return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
    //         }
    //     }


    // }
}