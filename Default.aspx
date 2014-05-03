<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="DefaultStyleSheet.css" />
    <script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="JavaScript.js"></script>
    <title></title>
</head>
<body>
    <form id="mainForm" runat="server">
        <div id="topPanel">
                <img src="mainlogo.png" id="mainLogo" />
                <span id="mainText">DICOM browser beta</span>
        </div>
        <div id="leftPanel">
            <asp:Button CssClass="leftButton" ID="openFile" runat="server" Text="Reload picture..." OnClientClick="loadPicture(); return false;" /><br />
            <asp:Button CssClass="leftButton" ID="browseImages" runat="server" Text="Show list of pictures..." OnClientClick="showList(); return false;"/><br />
            <div id="leftMoveButtonsSubpanel" class="leftSubpanel">
            <asp:Button CssClass="leftSmallButton" ID="leftMoveButton" runat="server" Text="<-" OnClientClick="moveVPLeft(); return false;"/>
            <asp:Button CssClass="leftSmallButton" ID="upMoveButton" runat="server" Text="^" OnClientClick="moveVPUp(); return false;"/>
            <asp:Button CssClass="leftSmallButton" ID="rightMoveButton" runat="server" Text="->" OnClientClick="moveVPRight(); return false;" />
            <asp:Button CssClass="leftSmallButton" ID="downMoveButton" runat="server" Text="v" OnClientClick="moveVPDown(); return false;"/>
            </div>
            <div id="leftZoomButtonsSubpanel" class="leftSubpanel">
                <asp:Button CssClass="leftSmallButton" ID="zoomInButton" runat="server" Text="+" OnClientClick="zoomIn(); return false;"/>
                <asp:Button CssClass="leftSmallButton" ID="zoomOutButton" runat="server" Text="-" OnClientClick="zoomOut(); return false;"/>
            </div>
        </div>
        <div id="rightPanel">
            <p id="linkList"></p>
        </div>
        <div id="centerPanel">
            <canvas id="mainCanvas"></canvas>
        </div>
        <div id="hiddenPictures">
            <img id="hiddenImage" src="graypixel.png" alt="-" />
        </div>
    </form>
</body>
</html>
