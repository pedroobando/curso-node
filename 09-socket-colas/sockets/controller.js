const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('ultimo-ticket', ticketControl.ultimo);
  socket.emit('estado-actual', ticketControl.ultimos4);
  socket.emit('ticket-pendientes', ticketControl.tickets);

  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    socket.broadcast.emit('ticket-pendientes', ticketControl.tickets);
  });

  socket.on('atender-ticket', ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio',
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);

    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    socket.broadcast.emit('ticket-pendientes', ticketControl.tickets);
    socket.emit('ticket-pendientes', ticketControl.tickets);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'Ya no hay ticket por atender',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
