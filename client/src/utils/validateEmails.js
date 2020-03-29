// Regular expression to validate email.
const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default (emails) => {
  const invalidEmailArray = emails
    .split(',')
    .map(each => each.trim())
    .filter(email => reg.test(email) === false);

  if(invalidEmailArray.length) {
    return `These emails are invalid: ${invalidEmailArray}`;
  }
  return;
}