<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="DefaultStyleSheet.css" />
    <script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js" type="text/javascript"></script>
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
            <div id="leftRealMoveButtonsSubpanel" class="leftSubpanel">
                <asp:ImageButton CssClass="leftSmallButton leftButton" ID="upMoveButton" runat="server" ImageUrl="Aiga_uparrow.gif" OnClientClick="moveVPUp(); return false;"/><br />
                <asp:ImageButton CssClass="leftSmallButton leftButton" ID="leftMoveButton" runat="server" ImageUrl="Aiga_leftarrow.gif" OnClientClick="moveVPLeft(); return false;"/>
                <asp:ImageButton CssClass="leftSmallButton leftButton" ID="rightMoveButton" runat="server" ImageUrl="Aiga_rightarrow.gif" OnClientClick="moveVPRight(); return false;" /><br />
                <asp:ImageButton CssClass="leftSmallButton leftButton" ID="downMoveButton" runat="server" ImageUrl="Aiga_downarrow.png" OnClientClick="moveVPDown(); return false;"/>
            </div>
            <div id="leftMoveButtonsSubpanel" class="leftSubpanel">
                <div id="brightnessRangeDiv"><img src="brightness.png" class="rangePic" alt="Br"/><input type="range" id="brightnessrange" class="range" min="0" max="100"/></div><br />
                <div id="contrastRangeDiv"><img src="contrast.png" class="rangePic" alt="Co"/><input type="range" id="contrastrange" class="range" min="0" max="100"/></div><br />
                <div id="redRangeDiv"><img src="red.png" class="rangePic" alt="R"/><input type="range" id="redrange" class="range" min="0" max="100"/></div><br />
                <div id="greenRangeDiv"><img src="green.png" class="rangePic" alt="G"/><input type="range" id="greenrange" class="range" min="0" max="100"/></div><br />
                <div id="blueRangeDiv"><img src="blue.png" class="rangePic" alt="B"/><input type="range" id="bluerange" class="range" min="0" max="100"/></div><br />
            </div>
            <div id="leftZoomButtonsSubpanel" class="leftSubpanel">
                <asp:Button CssClass="leftZoomButton leftButton" ID="zoomOutButton" runat="server" Text="-" OnClientClick="zoomOut(); return false;"/>
                <input type="range" id="zoomrange" class="range" min="0" max="10" value="0"/>
                <asp:Button CssClass="leftZoomButton leftButton" ID="zoomInButton" runat="server" Text="+" OnClientClick="zoomIn(); return false;"/>
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
