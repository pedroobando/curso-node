// refencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

divAlerta.style.display = 'none';
lblPendientes.innerText = '0';

const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');
  btnAtender.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');
  btnAtender.disabled = true;
});

// socket.emit('ticket-pendientes', ticketControl.tickets);
socket.on('ticket-pendientes', (payload) => {
  const ticketPend = payload.length;
  if (ticketPend <= 0) {
    divAlerta.style.display = '';
    lblPendientes.innerText = '';
    btnAtender.disabled = true;
  } else {
    divAlerta.style.display = 'none';
    lblPendientes.innerText = ticketPend;
    btnAtender.disabled = false;
  }
});

socket.on('ultimo-ticket', (payload) => {
  // lblNuevoTicket.innerHTML = `Ticket ${payload}`;
});

// socket.on('enviar-mensaje', (payload) => {
//   console.log(payload);
// });

btnAtender.addEventListener('click', () => {
  // console.log({ escritorio });
  socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      divAlerta.innerText = msg;
      lblTicket.innerText = 'nadie';
      return (divAlerta.style.display = '');
    }

    lblTicket.innerText = `Ticket ${ticket.numero}`;
  });
});
