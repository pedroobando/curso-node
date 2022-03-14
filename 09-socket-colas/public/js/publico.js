//referencias HTML

const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');

const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');
  // btnCrear.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');
  // btnCrear.disabled = true;
});

socket.on('estado-actual', (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload;

  const audio = new Audio('../audio/new-ticket.mp3');
  audio.play();

  if (ticket1) {
    lblEscritorio1.innerHTML = ticket1.escritorio;
    lblTicket1.innerHTML = `Ticket ${ticket1.numero}`;
  }
  if (ticket2) {
    lblEscritorio2.innerHTML = ticket2.escritorio;
    lblTicket2.innerHTML = `Ticket ${ticket2.numero}`;
  }
  if (ticket3) {
    lblEscritorio3.innerHTML = ticket3.escritorio;
    lblTicket3.innerHTML = `Ticket ${ticket3.numero}`;
  }
  if (ticket4) {
    lblEscritorio4.innerHTML = ticket4.escritorio;
    lblTicket4.innerHTML = `Ticket ${ticket4.numero}`;
  }
});
