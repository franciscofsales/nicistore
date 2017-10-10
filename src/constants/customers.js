import keyMirror from 'react/lib/keyMirror';


export const customerStatus = [
  {
    name: 'active',
    value: 'active'
  },
  {
    name: 'pendingConfirmation',
    value: 'pendingConfirmation'
  },
  {
    name: 'disabled',
    value: 'disabled'
  }
];

export default keyMirror({
    CUSTOMERS_FIND: null,
    CUSTOMERS_FIND_SUCCESS: null,
    CUSTOMERS_FIND_ERROR: null,
    CUSTOMERS_RETRIEVE: null,
    CUSTOMERS_RETRIEVE_SUCCESS: null,
    CUSTOMERS_RETRIEVE_ERROR: null,
    CUSTOMERS_SAVE: null,
    CUSTOMERS_SAVE_SUCCESS: null,
    CUSTOMERS_SAVE_ERROR: null,
});
