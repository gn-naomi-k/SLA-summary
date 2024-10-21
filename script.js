import {ticket} from './ticket.js';



// Handle request function to handle hard coded ticket for now
function handleRequest(ticketID, ticketName, ticketURL, eventType) {

    switch(eventType){
        case "BREACHED":
            // Create test ticket object
            let newTicket = new ticket(ticketID, ticketName, ticketURL, eventType);
            addTicket(newTicket);

        default:
            removeTicket(ticketID);
    }
    
      
}

function addTicket(newTicket){
    console.log('New ticket created.')
    
}

function removeTicket(ticketID){

}

handleRequest("442786", "Quiero recuperar unos archivos que no se guradaron bien", "https://goodnotes.zendesk.com/agent/tickets/442786", "BREACHED");