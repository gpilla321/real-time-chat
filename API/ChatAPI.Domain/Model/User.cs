namespace ChatAPI.Domain.Model
{
    public class User : Base
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
