using System.Security.Cryptography;
using System.Text;

namespace Gevorgyan.TodoListApp.Application.Utilities
{
    /// <summary>
    /// Utility for generating Hash code
    /// </summary>
    public static class HashHelper
    {
        private static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = SHA1.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        /// <summary>
        /// Returns hash code using an input string (by SHA1 algorithm)
        /// </summary>
        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}
