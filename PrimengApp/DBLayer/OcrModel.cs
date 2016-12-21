namespace PrimengApp.DBLayer
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class OcrModel : DbContext
    {
        public OcrModel()
            : base("name=OcrDataModel")
        {
        }

        public virtual DbSet<OcrMap> OcrMaps { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
