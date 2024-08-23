using ChatAPI.Domain.InputType;
using FluentValidation;

namespace ChatAPI.Services.Validators.User
{
    public class CreateUserValidator : AbstractValidator<CreateUserInput>
    {
        public CreateUserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username cannot be empty");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name cannot be empty");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("Confirm Password cannot be empty");
        }   
    }
}
