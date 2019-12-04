// utils for contact form

const emailAddr = 'cant.imagine.why00@gmail.com';

export const contactEmailLink = () => {
  return `mailto:${emailAddr}`;
}

export const orderEmailLink = itemId => {
  let msg = `I'm interested in purchasing one of your paintings, the one identified as '${itemId}'.`;
  msg += ' Please instruct me as to next steps.';
  let link = `mailto:${emailAddr}`;
  link += '?subject=Order';
  link += '&body=' + encodeURI(msg);
  return link
} 
