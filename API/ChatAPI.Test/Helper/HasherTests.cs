using ChatAPI.Services.Helper;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ChatAPI.Test.Helper
{
    public class HasherTests
    {

        [Test]
        public void Generate_Success()
        {
            var newPassword = "newPassword";
            var result = Hasher.Hash(newPassword);

            Assert.AreNotEqual(null, result);
            Assert.IsFalse(string.IsNullOrEmpty(result.Item2));
        }

        [Test]
        public void Generate_SameAlgorithm()
        {
            var strSalt = "oES7sLW0arOHs7ZSKoyE7g==";
            var hashedPassword = "oTFBxI82nesMVSV2Qj2mO/jHofZAfwDsZ9Jyrg7HgT0=";
            var salt = Convert.FromBase64String(strSalt);

            var newPassword = "newPassword";
            var result = Hasher.Hash(newPassword, salt);

            Assert.AreNotEqual(null, result);
            Assert.AreEqual(hashedPassword, result.Item2);
        }
    }
}
