<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="DefaultStyleSheet.css" />
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
            <asp:Button CssClass="leftButton" ID="openFile" runat="server" Text="Open file..." OnClientClick="loadPicture('sample.png'); return false;" /><br />
            <asp:Button CssClass="leftButton" ID="browseImages" runat="server" Text="Browse images..." /><br />
            <div id="leftMoveButtonsSubpanel" class="leftSubpanel">
            <asp:Button CssClass="leftSmallButton" ID="leftMoveButton" runat="server" Text="<-" OnClientClick="moveVPLeft(); return false;"/>
            <asp:Button CssClass="leftSmallButton" ID="upMoveButton" runat="server" Text="^" OnClientClick="moveVPUp(); return false;"/>
            <asp:Button CssClass="leftSmallButton" ID="rightMoveButton" runat="server" Text="->" OnClientClick="moveVPRight(); return false;" />
            <asp:Button CssClass="leftSmallButton" ID="downMoveButton" runat="server" Text="v" OnClientClick="moveVPDown(); return false;"/>
            </div>
            <div id="leftZoomButtonsSubpanel" class="leftSubpanel">
                <asp:Button CssClass="leftSmallButton" ID="zoomInButton" runat="server" Text="+"/>
                <asp:Button CssClass="leftSmallButton" ID="zoomOutButton" runat="server" Text="-"/>
            </div>
        </div>
        <div id="rightPanel">
        </div>
        <div id="centerPanel">
            <canvas id="mainCanvas"></canvas>          
        </div>
    </form>
</body>
</html>
