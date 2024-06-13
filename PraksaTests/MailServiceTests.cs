using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PraksaBACK.MailUtil;
using PraksaBACK.Model;
using System.Threading;
using System.Threading.Tasks;

namespace PraksaTests
{
    [TestClass]
    public class MailServiceTests
    {
        private MailService _mailService;
        private Mock<IOptions<MailSettings>> _mailSettingsMock;

        [TestInitialize]
        public void Setup()
        {
            _mailSettingsMock = new Mock<IOptions<MailSettings>>();
            _mailSettingsMock.Setup(m => m.Value).Returns(new MailSettings
            {
                Host = "smtp.gmail.com",  // Replace with your SMTP server details
                Port = 587,
                UseSSL = false,
                UseStartTls = true,
                UserName = "marailic001@gmail.com",
                Password = "rzfj bbwf usag ardm",
                DisplayName = "Isa Isovic"
                 
            });

            _mailService = new MailService(_mailSettingsMock.Object);
        }

        [TestMethod]
        public async Task SendMail_SuccessfullySendsEmail()
        {
            // Arrange
            var mailData = new MailData
            {
                From = "sender@example.com",
                To = new List<string> { "recipient1@example.com", "recipient2@example.com" },
                Subject = "Test Email",
                Body = "<p>This is a test email body.</p>"
            };

            // Act
            var result = await _mailService.SendMail(mailData, CancellationToken.None);

            // Assert
            Assert.IsTrue(result, "Expected SendMail to return true indicating success.");
        }
    }
}
