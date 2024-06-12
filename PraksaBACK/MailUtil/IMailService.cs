using PraksaBACK.Model;
using Org.BouncyCastle.Asn1.Pkcs;
using System.Threading.Tasks;
using System.Threading;

namespace PraksaBACK.MailUtil
{
    public interface IMailService
    {
        
        Task<bool> SendMail(MailData mailData, CancellationToken ct = default);
        
    }
}