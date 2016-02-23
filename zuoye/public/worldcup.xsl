<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <xsl:template match="/">
     <html>
     <body>
     <table border="1"  cellspacing="0"  align="center">
     <tr><td>队名</td><td>场地</td></tr>
     <xsl:for-each select="CnGame/Opponent">
     <tr>
        <td><xsl:value-of select="TeamName"/></td>
        <xsl:choose>
             <xsl:when test="Place='韩国汉城'">
                <td bgcolor="yellow">
                <xsl:value-of select="Place"/>
                <xsl:text>hehe</xsl:text>
                </td>
             </xsl:when>
             <xsl:otherwise>
                <td><xsl:value-of select="Place"/></td>
             </xsl:otherwise>
        </xsl:choose>							
      </tr>
      </xsl:for-each>
      </table>
      </body>
      </html>
   </xsl:template>
</xsl:stylesheet>
