jQuery(document).ready(function($) {
	$.fn.afficherTableau = function(className,etat)
	{
      var p = "";
      for(var i = 0;i<etat.length;i++)
      {
        for(var o = 0;o<etat[i].length;o++)
        {
                p= p+"<li class='"+className+"'>"+etat[i][o].toString()+"</li>";
        }
      }
      return this.each(function() {
      	$(this).html("");
      	$(this).append(p);
      });;
	};
  $.fn.videTableau = function(className,taille)
  {
      var p = "";
      for(var i = 0;i<taille;i++)
      {
        for(var o = 0;o<taille;o++)
        {
                p= p+"<input class='"+className+"' value='0'/>";
        }
      }
      return this.each(function() {
        $(this).html("");
        $(this).append(p);
      });;
  };
  $.fn.injecteTableau = function(className,taille,tab)
  {
     var tb = new Array();
      return this.each(function() {
      
      for(var i = 0;i<taille;i++)
      {  
        tb.push(new Array());
        for(var o = 0;o<taille;o++)
        {
         tb[i].push($(this).find(className).eq(i).html());  
        }
      }
      tab = tb;

      });;
  };
  
	});