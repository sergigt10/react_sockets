const Marcadores = require("./marcadores");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado!');

            socket.emit('marcadores-activos', this.marcadores.activos);

            socket.on('marcadores-nuevo', ( marcador ) => {
                this.marcadores.agregarMarcador( marcador );
                socket.broadcast.emit('marcadores-nuevo', marcador);
            });

            socket.on('marcador-actualizado', (marcador) => {
                this.marcadores.actualizarMarcador( marcador );
                socket.broadcast.emit('marcador-actualizado', marcador);
            });

        });
    }


}


module.exports = Sockets;