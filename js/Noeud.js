
function Noeud(val)
{ 
    this.parent = val.parent;
    this.h      = val.h;
    this.g      = val.g;
    this.etat   = val.etat;
    this.cout   = val.cout;
    this.f      = this.h+this.g+this.cout;
}
Noeud.prototype=
{
    getEtat:function()
    {
        return this.etat;
    }
}