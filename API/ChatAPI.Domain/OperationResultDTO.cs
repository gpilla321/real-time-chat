namespace ChatAPI.Domain
{
    public class OperationResultDTO<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
    }
}
