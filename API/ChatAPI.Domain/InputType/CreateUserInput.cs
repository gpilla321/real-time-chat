namespace ChatAPI.Domain.InputType
{
    public class CreateUserInput
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
