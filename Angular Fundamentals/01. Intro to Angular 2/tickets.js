function ticketGenerator(tickets, criteria) {
    var outputTickets = [];
    for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
        var ticket = tickets_1[_i];
        var splitTokens = ticket.split('|');
        var destination = splitTokens[0];
        var price = Number(splitTokens[1]);
        var status_1 = splitTokens[2];
        outputTickets.push({
            destination: destination,
            price: price,
            status: status_1
        });
    }
    switch (criteria) {
        case 'destination':
            sortTickets('destination');
            break;
        case 'status':
            sortTickets('status');
            break;
        case 'price':
            sortTickets('price');
            break;
    }
    function sortTickets(critera) {
        if (typeof criteria == 'number') {
            outputTickets.sort(function (a, b) { return a['price'] - b['price']; });
        }
        else {
            outputTickets.sort(function (a, b) { return a[criteria].localeCompare(b[criteria]); });
        }
    }
    outputTickets.forEach(function (ticket) {
        var obj = Object.create(null);
        obj.Ticket = ticket;
        console.log(obj);
    });
}
ticketGenerator(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'], 'destination');
