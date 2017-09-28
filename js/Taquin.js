
function Taquin()
{
  this.colomn;
  this.ligne;
  this.etatInitiale;
}
Taquin.prototype=
  {
  load:function(val)
  {
    this.colonne         = val.colonne;
    this.ligne           = val.ligne;  
  },
  loadEtatInit:function(val)
  {
    this.etatInitiale  = val.etatInitiale;
  },
  loadEtatFinal:function(val)
  {
    this.etatFinal    = val.etatFinal;
  }
  };