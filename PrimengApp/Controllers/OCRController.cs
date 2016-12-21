using Newtonsoft.Json;
using PrimengApp.DBLayer;
using PrimengApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PrimengApp.Controllers
{
    public class OCRController : Controller
    {
        public async Task<JsonResult> uploadFile(HttpPostedFileBase file)
        {
            MemoryStream target = new MemoryStream();
            file.InputStream.CopyTo(target);
            byte[] imageData = target.ToArray();
            string resultTextString = "";
            string error = "";
            try
            {
                HttpClient httpClient = new HttpClient();
                httpClient.Timeout = new TimeSpan(1, 1, 1);
                //Removed the api key from headers
                //httpClient.DefaultRequestHeaders.TryAddWithoutValidation("apikey", "5a64d478-9c89-43d8-88e3-c65de9999580");

                MultipartFormDataContent form = new MultipartFormDataContent();
                //5a64d478-9c89-43d8-88e3-c65de9999580
                form.Add(new StringContent("helloworld"), "apikey"); //The "helloworld" key works, but it has a very low rate limit. You can get your won free api key at https://ocr.space/OCRAPI
                form.Add(new StringContent("eng"), "language");

                form.Add(new ByteArrayContent(imageData, 0, imageData.Length), "image", GetContentType(file.ContentType));

                //else if (string.IsNullOrEmpty(PdfPath) == false)
                //{
                //    byte[] imageData = File.ReadAllBytes(PdfPath);
                //    form.Add(new ByteArrayContent(imageData, 0, imageData.Length), "PDF", "pdf.pdf");
                //}

                HttpResponseMessage response = await httpClient.PostAsync("https://api.ocr.space/Parse/Image", form);

                string strContent = await response.Content.ReadAsStringAsync();



                Rootobject ocrResult = JsonConvert.DeserializeObject<Rootobject>(strContent);


                if (ocrResult.OCRExitCode == 1)
                {
                    for (int i = 0; i < ocrResult.ParsedResults.Count(); i++)
                    {
                        resultTextString += ocrResult.ParsedResults[i].ParsedText;
                    }
                }
                else
                {
                    error = strContent;

                }




            }
            catch (Exception exception)
            {
                error = exception.Message;
            }
            if (string.IsNullOrEmpty(error))
            {
                resultTextString = resultTextString.Replace("\\r", "").Replace("\\n", "");

            }
            return Json(new { text = resultTextString, error = error });
        }
        private string GetContentType(string name)
        {
            //.pdf,.jpg,.png,.jpeg,.bmp,.gif
            string pth = name.Replace("/", ".");
            return pth;
        }

        [HttpGet]
        public JsonResult GetAwaitList()
        {
            using (OcrModel db = new OcrModel())
            {
                var list = db.OcrMaps.Where(_ => _.isMapped == false).ToList<OcrMap>();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SaveAwait(OcrMap map)
        {
            using (OcrModel db = new OcrModel())
            {
                OcrMap temp = db.OcrMaps.Find(map.id);
                if (temp != null) {
                    temp.isMapped = true;
                    temp.ocr_map = map.ocr_map;
                    db.SaveChanges();
                }
            }
            return Json(new { msg = "saved" });
        }
    }
}