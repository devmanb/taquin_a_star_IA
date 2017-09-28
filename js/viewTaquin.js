jQuery(document).ready(function($) {
	$.fn.viewTaquin = function(configuration,tableau,taquin_final)
	{
		var self = this;
		self.configuration = configuration;
		window.viewTaquinRef = self;
		return this.each(function() {
		$(self).html("");
		self.configuration.taquin.classNameFinal = configuration.taquin.classNameFinal;
		self.configuration.taquin.classNameJeu   = configuration.taquin.classNameJeu;
		$(self).html("<div class='col-sm-4 col-lg-3 col-xs-8 col-xs-offset-2 col-md-3 col-md-offset-2 col-lg-offset-2 col-sm-offset-1 "+self.configuration.taquin.classNameJeu+"'></div><div class='col-sm-4 col-lg-3  col-xs-8 col-xs-offset-2 col-md-3 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 "+self.configuration.taquin.classNameFinal+"'></div>");
		self.configuration.width = $('.'+self.configuration.taquin.classNameJeu).width()-self.configuration.Button.espacement/2+'px';
		self.configuration.height = $('.'+self.configuration.taquin.classNameJeu).width()-self.configuration.Button.espacement/2+'px';
		self.configuration.marginTop = self.configuration.Button.marginTop;
		self.configuration.marginLeft = self.configuration.Button.marginLeft;
		self.configuration.espacement = self.configuration.Button.espacement;
		self.wtaille_btn = Math.round((parseInt(self.configuration.width)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
	    self.htaille_btn = Math.round((parseInt(self.configuration.height)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
		$('.'+self.configuration.taquin.classNameJeu).height((self.wtaille_btn+self.configuration.marginTop)*self.configuration.taille+self.configuration.marginTop+'px');
	    $('.'+self.configuration.taquin.classNameJeu).width((self.wtaille_btn+self.configuration.marginTop)*self.configuration.taille+self.configuration.marginTop+1+'px');
	    $('.'+self.configuration.taquin.classNameFinal).height((self.wtaille_btn+self.configuration.marginTop)*self.configuration.taille+self.configuration.marginTop+'px');
	    $('.'+self.configuration.taquin.classNameFinal).width((self.wtaille_btn+self.configuration.marginTop)*self.configuration.taille+self.configuration.marginTop+1+'px');
		self.Button = function(v)
		{
			this.x  = v.x;
			this.y  = v.y;
			this.valeur = v.valeur;
	     	this.wtaille_btn = Math.round((parseInt(self.configuration.width)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
	    	this.htaille_btn = Math.round((parseInt(self.configuration.height)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
	    	
	    	// console.log(self.configuration.width)
	    	this.background = v.background;
	    	this.backgroundSize = v.backgroundSize;
	    	
	    	this.span = document.createElement('span');
	    	$(this.span).attr('data-x',this.x);
	    	$(this.span).attr('data-y',this.y);
	    	$(this.span).attr('data-value',this.valeur);
	    	$(this.span).height(this.htaille_btn+'px').width(this.wtaille_btn+'px');
	    	$(this.span).attr('class', 'piece');
	    	if(typeof self.configuration.background == 'undefined')
	    	{
	    		if(this.valeur != 0)
	    		$(this.span).append(this.valeur);
	    		$(this.span).css('background', '#aaa');
	    	}else {
	    		if(self.configuration.displayNumero == true)
	    		{
	    			$(this.span).append(this.valeur);
	    		}
	    	}
	    	// console.log(this)
	    	return this;
		};
		self.find = 
		{
			in:function(taquin,valeur)
			{

				for (var i = 0; i < $(taquin).find(".piece").length; i++) {
					if($(taquin).find('.piece').eq(i).attr('data-value') == valeur)
					{
						return $(taquin).find('.piece').eq(i);
					}
				}
			},
		}
		self.scene = 
		{
			genererButton:function(v)
			{
				var k =0;
				$(v.taquin).html("");
				var valeur = (typeof v.tableau == 'undefined')?-1:v.tableau[0][0];
				var taille = self.configuration.taille;
				var espacement = self.configuration.espacement;
				var marginTop = self.configuration.marginTop;
				var marginLeft = self.configuration.marginLeft;
	     		var wtaille_btn = Math.round((parseInt(self.configuration.width)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
	    		var htaille_btn = Math.round((parseInt(self.configuration.height)-(parseInt(self.configuration.taille)+1)*parseInt(self.configuration.espacement))/self.configuration.taille);
		        for(var i=0;i<taille;i++)
		        {
		        	for(var j=0;j<taille;j++)
		        	{
						valeur = (typeof v.tableau == 'undefined')?valeur+1:v.tableau[i][j];
		        		marginLeft=((j == 0)?parseInt(espacement):parseInt(marginLeft)+wtaille_btn+parseInt(espacement))+'px';
		        	    if((k)%taille == 0 && i != 0) marginTop = parseInt(wtaille_btn)+parseInt(marginTop)+parseInt(espacement)+'px'; 
		        	    if(k != (taille*taille))
		        	    var piece  =new self.Button({x:i,y:j,valeur:valeur});
		        	    $(piece.span).css({marginLeft:marginLeft});
		        	    $(piece.span).css({marginTop:marginTop});
		        	    if(valeur == 0)
		        	    {

		        	    	$(piece.span).css('background', 'none');
		        	    	$(piece.span).css('border', 'none');
		        	    	$(piece.span).css('cursor', 'default');
		        	    }

		        	    if(typeof v.taquin_final == 'undefined')
	    				{
	    					if(typeof self.configuration.background != 'undefined')
	    				if(valeur !=0)
		        			$(piece.span).css({background:self.configuration.background,'background-size':wtaille_btn*(taille)+'px '+ wtaille_btn*(taille)+'px'}).css('background-repeat','no-repeat').css('background-position-y', -parseInt(marginTop)+parseInt(espacement)*2+'px').css('background-position-x', -parseInt(marginLeft)+parseInt(espacement)*2+'px');
	    				}else {
	    					var p = self.find.in(v.taquin_final,valeur);
	    			    if(valeur == 0)
		        	    {

		        	    	$(piece.span).css('background', 'none');
		        	    	$(piece.span).css('border', 'none');
		        	    	$(piece.span).css('cursor', 'default');
		        	    }
		        	    else
		        			$(piece.span).css({background:self.configuration.background,'background-size':p.css('backgroundSize')}).css('backgroundRepeat','no-repeat').css('background-position-y',p.css('background-position-y')).css('background-position-x',p.css('background-position-x'));
	    				}	

		        	    $(v.taquin).append(piece.span);

		        	    k++;
								        	    
		        	    // console.log({nbr:k,valeur:valeur})
		        	}
		        }
		        if(v.taquin == "."+self.configuration.taquin.classNameJeu)
        	    {
        	    	$("."+self.configuration.taquin.classNameJeu).append("<div class='jeu'></div>");
        	    }
		        $(v.taquin).addClass('taquin');
    	},
		};
		self.scene.genererButton({taquin:"."+self.configuration.taquin.classNameFinal,tableau:configuration.finalTable});
		self.scene.genererButton({taquin:"."+self.configuration.taquin.classNameJeu,tableau:self.configuration.currentTable,taquin_final:"."+self.configuration.taquin.classNameFinal});
		console.log(self.htaille_btn);
		$('.piece').css('lineHeight',self.htaille_btn+'px');
		// $('.'+self.configuration.taquin.classNameJeu).mousedown(function(event) {
		// 	console.log($(event.target).width()+self.configuration.espacement+self.configuration.espacement/2)
		// 	$(event.target).animate({marginLeft:$(event.target).width()+self.configuration.espacement+self.configuration.espacement+self.configuration.espacement/2},200);
		// });
		});
	};
	$.fn.genererButton = function(v)
	{
		
		return window.viewTaquinRef.scene.genererButton(v);
	};
	});