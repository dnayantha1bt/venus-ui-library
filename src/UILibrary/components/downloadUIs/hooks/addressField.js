export const addressField = values => {
    console.log('VALL', values);

    const address1 = { field: { _order: 'a', name: 'address1' }, label: 'Address' };
    const address2 = { field: { _order: 'b', name: 'address2' }, label: '' };
    const address3 = { field: { _order: 'c', name: 'address3' }, label: '' };
    const city = { field: { _order: 'd', name: 'city' }, label: 'City' };
    const postalCode = { field: { _order: 'e', name: 'postalCode' }, label: 'Postal Code' };

    values.push(address1, address2, address3, city, postalCode);

    console.log('VALL2', values);
    return values;
};
