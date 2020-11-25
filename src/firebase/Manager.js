import firebase from './firebase';
import 'firebase/database';

export default class Manager {

  /**
   * @param {string} refPath path representing the location the returned Reference will point
   */
  constructor(refPath = false) {
    if (!refPath) throw new Error('refPath parameter must be defined');
    if (typeof refPath !== 'string') throw new Error('refPath parameter must a string');
    // if (refPath[0] !== '/') throw new Error('refPath must starts with "/"');
    
    this.ref = firebase.database().ref(refPath);
  }

  close() {
    this.ref.off('value', this.onValue);
  }

  /**
   * @param {function} onValue callback function to execute on 'value' event.
   * The function will be passed a DataSnapshot
   * @param {function} onError An optional callback that will be notified if your client does not have permission to read the data. 
   * This callback will be passed an Error object indicating why the failure occurred.
   */
  getAll(onValue, onError = null) {
    this.onValue = onValue;
    if (!onError) onError = (error => console.error(error.message));
    this.ref.on('value', onValue, onError);
  }

  /**
   * @param {function} onValue callback function to execute on 'value' event.
   * The function will be passed a DataSnapshot
   * @param {function} onError An optional callback that will be notified if your client does not have permission to read the data. 
   * This callback will be passed an Error object indicating why the failure occurred.
   */
  getAllOnce(onValue, onError = null) {
    if (!onError) onError = (error => console.error(error.message));
    this.ref.once('value', onValue, onError);
  }

  /**
   * to add data to a collection of items
   * @param {any} value 
   * @param {function} onComplete Callback called when write to server is complete.
   * @return Combined Promise and Reference; resolves when write is complete, 
   * but can be used immediately as the Reference to the child location.
   */
  add(value, onComplete = () => {}) {
    return this.ref.push(value, onComplete);
  }

  /**
   * push a collection of data
   * @param {object} values 
   * @param {function} onComplete 
   */
  multipleAdd(values, onComplete = () => {}) {
    let updates = {};

    values.forEach(word => {
      let newWordKey = this.ref.push().key;
      updates['/' + newWordKey] = word;
    });

    this.update(updates, onComplete);
  }

  /**
   * @param {any} value 
   * @param {function} onComplete Callback called when write to server is complete.
   */
  set(value, onComplete = () => {}) {
    const onError = error => console.error(error);
    this.ref
      .set(value)
      .then(onComplete)
      .catch(onError);
  }
  
  /**
   * @param {object} values 
   * @param {function} onComplete 
   * @return Resolves when update on server is complete.
   */
  update(values, onComplete = () => {}) {
    const onError = error => console.error(error);
    this.ref
      .update(values)
      .then(onComplete)
      .catch(onError);
  }

  /**
   * @param {function} onComplete 
   * @return Resolves when remove on server is complete.
   */
  delete(onComplete = () => {}) {
    const onError = error => console.error(error);
    this.ref
      .remove()
      .then(onComplete)
      .catch(onError);
  }
}
