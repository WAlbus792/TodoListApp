using System.Globalization;
using System.Text.RegularExpressions;

namespace Gevorgyan.TodoListApp.Application.Utilities
{
    /// <summary>
    /// Utility for Email validation
    /// </summary>
    public static class EmailValidationUtility
    {
        /// <summary>
        /// Checks that input string is valid for Email
        /// </summary>
        /// <param name="input">input string</param>
        public static bool CheckIsValidEmail(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return false;

            // Examines the domain part of the email and normalizes it.
            string DomainMapper(Match match)
            {
                // Use IdnMapping class to convert Unicode domain names.
                var idn = new IdnMapping();

                // Pull out and process domain name (throws ArgumentException on invalid)
                var domainName = idn.GetAscii(match.Groups[2].Value);

                return match.Groups[1].Value + domainName;
            }

            try
            {
                // Normalize the domain (use DomainMapper to convertion)
                input = Regex.Replace(input, @"(@)(.+)$", DomainMapper, RegexOptions.None);
            }
            catch { return false; }

            // Return true if input string is in valid e-mail format.
            try
            {
                return Regex.IsMatch(input,
                   @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                   @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                   RegexOptions.IgnoreCase);
            }
            catch { return false; }
        }
    }
}