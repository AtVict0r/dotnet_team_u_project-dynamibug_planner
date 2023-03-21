using System.Text;
using System.Reflection.Metadata;
using System.Dynamic;
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
using Microsoft.AspNetCore.Authorization;

namespace DynamiBugPlannerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;

        public EmailsController(IConfiguration config = null!, IUnitOfWork unitOfWork = null!)
        {
            _config = config;
            _unitOfWork = unitOfWork;
        }

        // POST: api/Emails
        [AllowAnonymous]
        [HttpPost(Name = "PostEmail")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostEmail([FromBody] EmailDTO emailDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _unitOfWork.Users.Get(q => q.UserName == emailDTO.UserName);

                if (user != null)
                {
                    var email = new OutlookDotComMail(
                        _config.GetValue<string>("Email:Address"),
                        _config.GetValue<string>("Email:Password") 
                    );

                    StringBuilder message = new StringBuilder($"Sender: {emailDTO.SenderName}\n");
                    message.Append($"Email: {emailDTO.SenderEmail}\n");
                    message.Append($"Title: {emailDTO.MessageTitle}\n");
                    message.Append($"Message: {emailDTO.MessageBody}");

                    email.SendMail(
                        user.Email,
                        $"{emailDTO.SenderName} sent a new message from Dynamibug Planner",
                        message.ToString()
                    );

                    return Ok();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Sever Error. Please Try Again Later.\n{ex}");
            }
        }


    }

    internal class OutlookDotComMail
    {
        string _sender = "";
        string _password = "";

        public OutlookDotComMail(string sender, string password)
        {
            _sender = sender;
            _password = password;
        }


        public void SendMail(string recipient, string subject, string message)
        {
            SmtpClient client = new SmtpClient("smtp-mail.outlook.com");

            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential(_sender, _password);
            client.EnableSsl = true;
            client.Credentials = credentials;

            var mail = new MailMessage(_sender.Trim(), recipient.Trim());
            mail.Subject = subject;
            mail.Body = message;
            client.Send(mail);
        }
    }
}