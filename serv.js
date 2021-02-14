 var Service = require('node-windows').Service;
     // Create a new service object
     var svc = new Service({
          name:'stagewebapiservice',
          description: 'Api para pagina de Stage',
          script: 'C:\\Users\\SERVER\\Documents\\Stage\\stage-backend\\lib\\bin\\www.js'
     });

     // Listen for the "install" event, which indicates the
     // process is available as a service.

     svc.on('install',function(){
                svc.start();
		console.log("Servicio iniciado");
     });
svc.on('invalidinstallation',function(e){
		console.log("Error al instalar");
		});
     svc.install();
