function AStar()
{
  this.test = 0.1;
}
AStar.prototype=
  {
     cloneArray:function(arr) {  
      var clone = new Array();
      for (i=0; i<arr.length; i++) {
        clone.push(new Array())
          for (j=0; j<arr.length; j++) {
           clone[i].push(arr[i][j]);
        } 
      }
      return clone;
    },
    distanceManathan:function(etat,etatFinale,val)
    {
      var posE = this.findPlace(etat,val);
      var posF = this.findPlace(etatFinale,val);
      var dx   =posE.x - posF.x;
      var dy   =posE.y - posF.y;
       return (((dx>0)?dx:-dx)+((dy>0)?dy:-dy));
     },
     sommeDistanceManathan:function(etat,etatFinale)
       {
        var d = 0;
          for(var i = 0;i<etat.length;i++)
          {
            for(var o = 0;o<etat.length;o++)
            { 
                if(etat[i][o]!=0)
               d = d+this.distanceManathan(etat,etatFinale,etat[i][o]);
            }
          }
        return d;
       },
     pionEnDesordre:function(etat,etatFinale)
     {
      var nombre = 0;
	  if(etat)
	    {
	      for(var i = 0;i<etat.length;i++)
	      {
	        for(var o = 0;o<etat.length;o++)
	        {
	            if(etat[i][o]!= 0 && etat[i][o] != etatFinale[i][o])
	            {
	                nombre++;
	            }
	        }
	      }
	    return nombre;
	    }else
	    return nombre;

     },
     generateurEtat:function(CurrentNoeud)
     {
         var etatGenere= new Array();
         var etat = CurrentNoeud.etat;
         var posCasV = this.findPlace(CurrentNoeud.etat,0);
         if((posCasV.x-1>=0) && etat[posCasV.y][posCasV.x] == 0)
             {  var tmp = this.cloneArray(etat);
                tmp[posCasV.y][posCasV.x]  =tmp[posCasV.y][posCasV.x-1];
             	tmp[posCasV.y][posCasV.x-1]=0;
                etatGenere.push(tmp);
                tmp = null;
             }

             if((posCasV.y-1>=0) && etat[posCasV.y][posCasV.x]== 0)
             {  
                var tmp = this.cloneArray(etat);
             	tmp[posCasV.y][posCasV.x]  =tmp[posCasV.y-1][posCasV.x];
             	tmp[posCasV.y-1][posCasV.x]=0;
                etatGenere.push(tmp);                tmp = null;

                 
             }
	
             if((posCasV.x+1)<etat.length && etat[posCasV.y][posCasV.x]== 0)
             {
               var  tmp = this.cloneArray(etat);
             	tmp[posCasV.y][posCasV.x]  =tmp[posCasV.y][posCasV.x+1];
             	tmp[posCasV.y][posCasV.x+1]=0;
                etatGenere.push(tmp);                tmp = null;

             }

             if((posCasV.y+1)<etat.length && etat[posCasV.y][posCasV.x]== 0)
             {                
                var tmp = this.cloneArray(etat);
             	tmp[posCasV.y][posCasV.x]  =tmp[posCasV.y+1][posCasV.x];
             	tmp[posCasV.y+1][posCasV.x]=0;
                etatGenere.push(tmp);                tmp = null;

             }
         return etatGenere;
     },findPlace:function(etat,val)
     {
      var pos = {x:"",y:""};
      for(var i = 0;i<etat.length;i++)
      {
        for(var o = 0;o<etat[i].length;o++)
        {
            if(etat[i][o] == val)
            {
                pos.y = i;
                pos.x = o;
                return pos;
            }

        }
      }
     },
     getPermutation:function(etat,final)
     {
        var ini   = this.cloneArray(etat);
        var final = this.cloneArray(final);
        var nbr_permutation = 0;
        for (var i = 0; i < ini.length; i++) {
            for (var j = 0; j < final.length; j++) {
                if(ini[i][j] != final[i][j])
                {
                    var t = ini[i][j];
                    var pos = this.findPlace(ini,final[i][j]);
                    ini[pos.y][pos.x] = t;
                    ini[i][j] = final[i][j];
                    nbr_permutation++;
                }
            }
        }
        return nbr_permutation;
     }
     ,findMinimun:function(file){
         var t = Infinity,h = Infinity,place =0,g = Infinity;
         for(var i = 0;i<file.length();i++)
             {
                if(t>file.get()[i].f)
                 //if(g>file.get()[i].g)
                 //if(t>file.get()[i].t)
                     {
                        h = file.get()[i].h;
                        g = file.get()[i].g;
                        t = file.get()[i].f;
                        place = i;
                     }
             }
          var k = file.pop(place)[0];
          return k;
       }
       ,
     start:function(etatInitiale,etatFinale)
     {
         var currentNoeud = null;
         if(this.getPermutation(etatInitiale,etatFinale)%2 == this.distanceManathan(etatInitiale,etatFinale,0)%2)
         {   var cout = 0;
             var openListe = new File();
             var n         =new Noeud({
                etat:this.cloneArray(etatInitiale),
                h:this.sommeDistanceManathan(etatInitiale,etatFinale),
                g:this.pionEnDesordre(etatInitiale,etatFinale),
                cout:cout,
                parent:null
             });
             var k =0;
             openListe.add(n);
             var colseListe= new File();
             while(openListe.length()!=0)
                 {
                     currentNoeud   = this.findMinimun(openListe);
                     colseListe.add(currentNoeud);

                    if(this.pionEnDesordre(currentNoeud.etat,etatFinale) == 0)
                        {
                           return currentNoeud;
                        }
                    generateurEtat = this.generateurEtat(currentNoeud);
                    // console.log(openListe.length())
                    for(var i = 0;i<generateurEtat.length;i++)
                        {
                         var t  = new Noeud({
                                etat:this.cloneArray(generateurEtat[i]),
                                h:this.sommeDistanceManathan(generateurEtat[i],etatFinale),
                                g:this.pionEnDesordre(generateurEtat[i],etatFinale),
                                cout:currentNoeud.cout+1,
                                parent:currentNoeud
                                });
                         if(colseListe.findIn(generateurEtat[i]) && openListe.findIn(generateurEtat[i]))
                             {
                                 openListe.add(t);
                             }else {
                            if(!openListe.findIn(generateurEtat[i]))
                            {
                                var rangt = openListe.getRangTableau(generateurEtat[i]);
                                if(t.f < openListe.get()[rangt].f)
                                {
                                    openListe.pop(rangt);
                                    openListe.add(t);

                                }         
                             }else
                            if(!colseListe.findIn(generateurEtat[i]))
                            {
                                var rangt = colseListe.getRangTableau(generateurEtat[i]);   
                                if(t.f < colseListe.get()[rangt].f)
                                    {
                                        colseListe.pop(rangt);
                                        openListe.add(t);
                                    }
                            }
                            }
                        }
                                   
                 }

             return currentNoeud;
        }else {
            return currentNoeud;
        }       
     },
    afficher:function(etat)
        {
            var t="";
            for(var ligne of etat)
            {
                for(var cas of ligne)t=t+cas+'|';
                t=t+'\n';
            }
        console.log(t);
        return t;
        }
     
  }
