using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Dicom.Imaging;
using Dicom.Imaging.Codec;

public partial class Default4 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Bitmap bmp;
        string fileName;
        try
        {
            fileName = Request.QueryString["fileName"];
        }
        catch (Exception)
        {
            throw new HttpException(400, "Bad Request");
        }
        if (string.IsNullOrEmpty(fileName)) throw new HttpException(400, "Bad Request");
        try
        {
            DicomTranscoder.LoadCodecs(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin"), "Dicom.Native*.dll");
            var image = new DicomImage(Context.Server.MapPath("~/DICOMs/" + fileName));
            bmp = new Bitmap(image.RenderImage());
        }
        catch (Exception)
        {
            throw new HttpException(500, "Internal Server Error");
        }
        StringBuilder sb = new StringBuilder();
        sb.Append("{\"x\" : ");
        sb.Append(bmp.Width);
        sb.Append(",\"y\" : ");
        sb.Append(bmp.Height);
        sb.Append("}");
        Response.Write(sb.ToString());
    }
}