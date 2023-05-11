using System.ComponentModel.DataAnnotations;

namespace LejlekuXpress.Data.DTO
{
    public class CountryDTO
    {
        public string Iso { get; set; }

        public string Name { get; set; }

        public string NiceName { get; set; }

        public string Iso3 { get; set; }

        public int NumCode { get; set; }

        public int PhoneCode { get; set; }
    }
}
