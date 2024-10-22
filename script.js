import {ticket} from './ticket.js';

// Deno database setup - just for testing, will be replaced with enviroment variable or AWS platform database :)
const currentBreached = await Deno.openKv();

// Handle request function to handle hard coded ticket for now
function handleRequest(ticketID, ticketName, ticketURL, eventType) {
    switch(eventType){
        case "BREACHED":
            // Create test ticket object
            let newTicket = new ticket(ticketID, ticketName, ticketURL, eventType);
            addTicket(newTicket);
            break;
        default:
            removeTicket(ticketID);
    }
}

// Add ticket to database
async function addTicket(newTicket) {
    await kv.set(`ticket:${newTicket.ticketID}`, {
        ticketID,
        ticketName,
        ticketURL,
        eventType,
    });
    console.log(`Ticket ${ticketID} added.`);
}

// Remove ticket from database
async function removeTicket(ticketID){
    await currentBreached.delete([ticketID]);
}

async function sendSummary(){
    const allTickets = await currentBreached.list({prefix: [""]});

    const ticketsArray = [];

    // Use for await to iterate over the iterable
    for await (const ticket of allTickets) {
        ticketsArray.push(ticket);
    }
    const date = Date.now();
    let fullMessage = `SLA Summary for ${date}:\n
                        # of breached tickets: ${allTickets.length}`;
}

handleRequest("442786", "Quiero recuperar unos archivos que no se guradaron bien", "link.com", "BREACHED");
handleRequest("442787", "Test 2", "https://goodnotes.zendesk.com/agent/tickets/442787", "BREACHED");
handleRequest("442788", "Test 3", "https://goodnotes.zendesk.com/agent/tickets/442788", "BREACHED");
handleRequest("442789", "Test 4", "https://goodnotes.zendesk.com/agent/tickets/442789", "BREACHED");

sendSummary();