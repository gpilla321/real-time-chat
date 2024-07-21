using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Services.Helper
{
    public static class Hasher
    {
        public static Tuple<byte[], string> Hash(string str, byte[]? generatedSalt = null)
        {
            byte[] salt = generatedSalt != null ? generatedSalt : RandomNumberGenerator.GetBytes(128 / 8);

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                                        password: str,
                                        salt: salt,
                                        prf: KeyDerivationPrf.HMACSHA256,
                                        iterationCount: 100000,
                                        numBytesRequested: 256 / 8));

            return new Tuple<byte[], string>(salt, hashed);
        }
    }
}
