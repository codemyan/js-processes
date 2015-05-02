var declared_processes	=	Array();

var gui = {
	layer:	{
		main:			document.createElement('div'),
		container:		document.createElement('div')
	}
};

gui.layer.main.id = 'js-processes-layer';
gui.layer.main.appendChild( gui.layer.container );

//sprawdzenie czy adres jest juz uzywany przez inny proces
function checkExistence( n ){
	for(var i = 0; i < declared_processes.length; i++){
		if( declared_processes[ i ] == n ) return true;
	}
	return false;
}

function process( n, f, t ){
	//n = name
	//f = function
	//t = timer
	
	if( typeof f == 'function' ){
		t	=	t	||	1000;
		
		//adding Process ID
		do {
			var tmp		=	Math.round( Math.random() * 10000 );
			this.pid	=	tmp;
			
			declared_processes.push(this);
		}
		while(checkExistence(tmp));
		
		//properties
		this.name	=	n;
		this.tmr	=	setInterval( f, t );
		this.work 	= 	true;
		
		//functions
		this.start	=	function(){
			if ( !this.work ){
				this.tmr	=	setInterval( f, t );
				this.work	=	true;
			}
		};
		
		this.end	=	function(){
			if ( this.work ){
				clearInterval( this.tmr );
				this.work	=	false;
			}
		};
		
		console.log( 'Created process "' + this.name + '" with PID: ' + this.pid );
		return true;
	}
	
	return false;
}

//gui
//zwroc tylko aktywne procesy
function getActiveProc(){
	tmp = Array();
	for( var i = 0; i < declared_processes.length; i++ ){
		if( declared_processes[ i ].work ){
			tmp.push( declared_processes[ i ] );
		}
	}
	return tmp;
}

//wyswietl aktywne procesy
function displayActiveProc(){
	//usuwanie wczesniej prezentowanych danych
	var myNode = gui.layer.container;
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	//zaprezentowanie nowych danych
	var tmp 	= 	getActiveProc();
	var tmp1	=	Array();
	
	if( tmp.length != 0 ){
		for( var i = 0; i < tmp.length; i++ ) {
			tmp1[ i ] = document.createElement( 'p' );
			tmp1[ i ].className = 	'js-process-info';
			tmp1[ i ].innerHTML =	'process <span class="js-process-name">' + tmp[ i ].name + '</span> <span class="js-process-id">(' + tmp[ i ].pid + ')</span> is working';
		
			gui.layer.container.appendChild( tmp1[ i ] );
		}
	}
}

window.onload = function(){
	document.body.appendChild( gui.layer.main );
	
	//proces glowny
	check_active_proc = new process( 'main', displayActiveProc, 1000 );
}
