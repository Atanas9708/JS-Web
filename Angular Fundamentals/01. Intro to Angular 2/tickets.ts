function ticketGenerator(tickets: string[], criteria: string) {
    let outputTickets: object[] = [];

    for (let ticket of tickets) {
        let splitTokens = ticket.split('|');
        let destination: string = splitTokens[0];
        let price: number = Number(splitTokens[1]);
        let status: string = splitTokens[2];

        outputTickets.push({
            destination,
            price,
            status
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

    function sortTickets(critera: string | number): void {
        if (typeof criteria == 'number') {
            outputTickets.sort((a: any, b: any) => a['price'] - b['price']);
        } else {
            outputTickets.sort((a: any, b: any) => a[criteria].localeCompare(b[criteria]));
        }
    }

    outputTickets.forEach((ticket) => {
        let obj = Object.create(null);
        obj.Ticket = ticket;
        console.log(obj);
    })
}

ticketGenerator(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'
);