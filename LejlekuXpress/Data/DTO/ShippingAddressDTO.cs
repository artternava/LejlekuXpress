namespace LejlekuXpress.Data.DTO
{
    public class ShippingAddressDTO
    {
        public int UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int CountryId { get; set; }

        public string? State { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string Address1 { get; set; }

        public string? Address2 { get; set; }
    }
}
