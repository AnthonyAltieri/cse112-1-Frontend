/**
 * @flow
 * @author Anthony Altieri on 4/24/17.
 */

import { post, get } from './Ajax';

/**
* Checks wether the user inputted username is valid according to the current username schema
* @param {string} username - The input string
* @return {boolean} true - if input follows the current username schema
* @return {boolean} false - if input does not follow the current username schema
*/
export const isUsernameValid = async (username) => {
  try {
    return await post('/api/validation/validate/user/username', { username });
  } catch (e) {
    return e;
  }
};

/**
* Updates the username schema based on the user input in the form
* @param {number}  usernameMinLength - user defined minimum username length
* @param {number} usernameMaxLength - user defined maxmium username length
* @param {string} usernameBannedChars - user defined list of banned characters for username
*/
export const updateUsernameSchema = async ({
  usernameMinLength,
  usernameMaxLength,
  usernameBannedChars,
}) => {
  try {
    return await post(
      '/api/validation/update/schema/user/username',
      { usernameMinLength, usernameMaxLength, usernameBannedChars }
    )
  } catch (e) {
    return e;
  }
};
/**
* Gets the current username schema
*/
export const getUsernameSchema = async () => {
  try {
    return await get('/api/validation/get/user/username');
  } catch (e) {
    return e;
  }
};