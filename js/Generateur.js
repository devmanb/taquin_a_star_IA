
function Generateur(v)
{
      var self      = this;
      this.taille   = v.taille;
      this.nombre_generer = 100;
      this.object   = new Array();      
      this.objectTableauGenere = new Array();
      this.objectCouple = new Array();
      this.create   = 
      {
        Taquin_:function(v)
          {
            this.etat = v.etat;
            this.final= v.final;
            this.parite  = v.parite;
            self.object.push(this);
          }
      };

      this.verifier =
      {
        compare:function(etat1,etat2)
        {
         var i = 0;var o=0;
               for(i=0;i<etat2.length;i++)
                {
                     if(etat1[i] == etat2[i])
                     {
                      return false;//pas egale
                     }
                }
                return true; //egale      
        }
        ,RepitionSequence:function(tableau) {
          for (var i = 0; i < self.objectTableauGenere.length; i++) {
            if(self.verifier.compare(self.objectTableauGenere[i],tableau))
            {
                return true;     
            }
          }
          return false;
        }
        ,Repition:function(tableau,val)
          {
           for (var i = 0; i < tableau.length; i++) {
                 if(tableau[i] == val)
                 {
                  return true;
                 }
             }  
             return false;
          }
      };
      this.traitement=
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
          Tableau2d:function(tab)
          {
            var t = new Array();
            var y = -1;
            var x = 0;
            for (var i = 0; i < tab.length; i++) {
              if(i%self.taille == 0)
              {
                t.push(new Array());
                y++;
                x = 0;
              }
              t[y][x] = tab[i];
              x++;
            }
            return t;
          },
          GenererRangCouple:function()
          {
            var c1 =  Math.floor(Math.random()*(self.nombre_generer));
            var c2 =Math.floor(Math.random()*(self.nombre_generer));
            if(c1 == c2)
            {
                while (c1 == c2) {
                c2 = Math.floor(Math.random()*(self.nombre_generer));
                 }
          }
            self.objectCouple.push({couple1:c1,couple2:c2});
            return {couple1:c1,couple2:c2};
          },
          assemblage:function()
          {
            var nbr_couple = parseInt(Math.round(self.nombre_generer/2));
            var i =0;
              while(i < nbr_couple) {
              var c =self.traitement.GenererRangCouple();
             if(self.traitement.couplage(self.traitement.Tableau2d(self.objectTableauGenere[c.couple1]),self.traitement.Tableau2d(self.objectTableauGenere[c.couple2])))
             {
              i++;
             }
            
            }
          },
         couplage:function(etat,final)
           {
              if(self.calcule.getPermutation(etat,final)%2 == self.calcule.distanceManathan(etat,final,0)%2)
              {
                  self.object.push(new self.create.Taquin_({etat:etat,final:final,parite:self.calcule.distanceManathan(etat,final,0)%2}));
                  return true;
              }else {
                return false;
              }
           }

      } 
      this.calcule  =
      {
      distanceManathan:function(etat,etatFinale,val)
        {
        var posE = self.calcule.findPlace(etat,val);
        var posF = self.calcule.findPlace(etatFinale,val);
        var dx   =posE.x - posF.x;
        var dy   =posE.y - posF.y;
         return (((dx>0)?dx:-dx)+((dy>0)?dy:-dy));
        } 
      ,findPlace:function(etat,val)
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
        var ini   = self.traitement.cloneArray(etat);
        var final = self.traitement.cloneArray(final);
        var nbr_permutation = 0;
        for (var i = 0; i < ini.length; i++) {
            for (var j = 0; j < final.length; j++) {
                if(ini[i][j] != final[i][j])
                {
                    var t = ini[i][j];
                    var pos = self.calcule.findPlace(ini,final[i][j]);
                    ini[pos.y][pos.x] = t;
                    ini[i][j] = final[i][j];
                    nbr_permutation++;
                }
            }
        }
        return nbr_permutation;
     }
      };
      this.gener=function()
      {
            var valeur_generer = new Array();
            var taille_taquin  = self.taille;
            while (valeur_generer.length < taille_taquin*taille_taquin)
            {
                var valeur = Math.floor(Math.random()*(taille_taquin*taille_taquin));
                if(!self.verifier.Repition(valeur_generer,valeur))
                {
                    valeur_generer.push(valeur);
                }
            }
            return valeur_generer;
      };

      this.start=function()
      {
          var n = 0;
          var tableau ;
          while (n < self.nombre_generer) {
            tableau =self.gener();
            if(!self.verifier.RepitionSequence(tableau))
            {
              self.objectTableauGenere.push(tableau);
              n++;
            }
          }
          self.traitement.assemblage();
      };
}

