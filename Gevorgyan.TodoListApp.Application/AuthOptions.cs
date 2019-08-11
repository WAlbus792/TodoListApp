using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Gevorgyan.TodoListApp.Application
{
    /// <summary>
    /// Options for JWT authentication
    /// </summary>
    public class AuthOptions
    {
        /// <summary>
        /// Token issuer
        /// </summary>
        public const string Issuer = "RestApi_User";

        /// <summary>
        /// Token audience
        /// </summary>
        public const string Audience = "RestApi_User";

        /// <summary>
        /// Key for encryption
        /// </summary>
        private const string Key = "Rdsa_edvxzcd434d*038s(4$5h5.-kanhstkjds;kkafgg{fpvdoi+7f9";

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
