using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Management.Instrumentation;
using System.Reflection;
using System.Web;
using Dicom.Imaging;
using Dicom.Imaging.Codec;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Bitmap bmp;
        int portX, portY, zoomLevel;
        string fileName;
        try
        {
            portX = Convert.ToInt32(Request.QueryString["viewPortX"]);
            portY = Convert.ToInt32(Request.QueryString["viewPortY"]);
            zoomLevel = Convert.ToInt32(Request.QueryString["zoomLevel"]);
            fileName = Request.QueryString["fileName"];
        }
        catch (Exception)
        {
            throw new HttpException(400, "Bad Request");
        }
        if (String.IsNullOrEmpty(fileName)) throw new HttpException(400, "Bad Request");
        try
        {
            var s = Context.Server.MapPath("~/DICOMs/" + fileName);
            var image = new DicomImage(s);
            bmp = new Bitmap(image.RenderImage());
        }
        catch (Exception)
        {
            throw new HttpException(500, "Internal Server Error");
        }
        double baseScalingFactor = ((double)portX/bmp.Width > (double)portY/bmp.Height ? (double)portX/bmp.Width : (double)portY/bmp.Height);
        if (baseScalingFactor >= 2) baseScalingFactor = 2;
        double interval = (2 - baseScalingFactor)/10;
        double scalingFactor = baseScalingFactor + zoomLevel*interval;
        Bitmap bmp2 = new Bitmap((int)(scalingFactor*bmp.Width), (int)(scalingFactor*bmp.Height));
        Graphics.FromImage(bmp2).InterpolationMode = InterpolationMode.High;
        Graphics.FromImage(bmp2).CompositingQuality = CompositingQuality.HighQuality;
        Graphics.FromImage(bmp2).SmoothingMode = SmoothingMode.AntiAlias;
        Graphics.FromImage(bmp2).DrawRectangle(Pens.Black, 0, 0, bmp2.Width, bmp2.Height);
        Graphics.FromImage(bmp2).DrawImage(bmp, 0, 0, (int)(scalingFactor * bmp.Width), (int)(scalingFactor * bmp.Height));
        Response.ContentType = "image/png";
        bmp2.Save(Response.OutputStream, ImageFormat.Png);
    }
}