const utils = require('../src/utils');

describe('getOhmById: route', () => {
    test('returns Ohm object', async () => {
        const ohm = await utils.getOhmById('1');
        expect(ohm).toBeDefined();
    });

    test('has a valid history', async () => {
        const ohm = await utils.getOhmById('1');
        const statuses = [ 'CREATED', 'PREPARING', 'READY', 'IN_DELIVERY','DELIVERED', 'REFUSED']
        const isValidStatus = statuses.includes(ohm.history[0].state)
        expect(isValidStatus).toBe(true);
    });
})

describe('getOhmByTrackingId: route', () => {
    test('returns Ohm object', async () => {
        const trackingId = '1e62adfe'
        const ohm = await utils.getOhmByTrackingId(trackingId);
        expect(ohm).toBeDefined();
    });

    test('has a valid history', async () => {
        const trackingId = '1e62adfe'
        const ohm = await utils.getOhmByTrackingId(trackingId);
        const statuses = [ 'CREATED', 'PREPARING', 'READY', 'IN_DELIVERY','DELIVERED', 'REFUSED']
        const isValidStatus = statuses.includes(ohm.history[0].state)
        expect(isValidStatus).toBe(true);
    });
})
