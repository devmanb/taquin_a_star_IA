function File()
{
  this.numbre =0;
  this.data  = new Array();
}
File.prototype=
  {
    length:function()
    {
      return this.numbre;
    },
    add:function(noeud)
    {
      this.data.push(noeud);
      this.numbre++;
    },
    pop:function(rang)
    { if(this.numbre>=0)
      {
        var t = this.data.splice(rang,1);
        this.numbre--;
        return t;
      }else  return null;
    },
    getRangTableau:function(etat)
    {
      var stop = false;
      var rang = -1;
      for(var i=0;i<this.numbre && !stop;i++)
       {
        if(this.compare(this.data[i].etat,etat))
        {
            rang = i;
            stop = true;
        }

       }
       return rang; 
        } 
    ,
    compare:function(etat1,etat2)
    {
     var i = 0;var o=0;
           for(i=0;i<etat2.length;i++)
            {

                for(o=0;o<etat2[i].length;o++)
                {

                    if(etat2[i][o] != etat1[i][o]){

                      return false;
                    }
                }
            }
            return true; //egale      
   },
   findIn:function(etat)
   {
     for(var i=0;i<this.numbre;i++)
     {
      if(this.compare(this.data[i].etat,etat))
      {
        return false;
      }
     }
     return true;
   },
   get:function()
    {
        return this.data;
    }
  };