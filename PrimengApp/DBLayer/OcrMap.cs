namespace PrimengApp.DBLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("OcrMap")]
    public partial class OcrMap
    {
        public int id { get; set; }

        public string ocr_content { get; set; }

        public string ocr_map { get; set; }

        public bool? isMapped { get; set; }

        public DateTime? requestTime { get; set; }
    }
}
