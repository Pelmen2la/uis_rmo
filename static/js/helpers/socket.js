import io from 'socket.io-client';

const appSocket = getAppSocket();

export default appSocket;

function getAppSocket() {
    const socket = io('http://localhost:8070');

    socket.on('connect', function() {
    });

    return socket;
};