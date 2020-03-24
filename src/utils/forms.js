
/*
 * FORMS
 * 
 */

/**
 * used in Netlify forms
 * @param {*} data 
 */
export const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export const SubmissionMethod = {
  Undetermined: 0,
  Netlify: 1,
  FormSubmitCo: 2,
  Other: 3
}

const fscTarget = 'https://formsubmit.co/cant.imagine.why00@gmail.com';

const DEFAULT_FORM_SUBMIT_METHOD = 1; // Netlify

/**
 * get submission target
 * @param {*} method 
 */
export const formSubmissionTarget = (method = 0) => {
  let retVal = '';
  const m = method || DEFAULT_FORM_SUBMIT_METHOD;
  switch (m) {
    case SubmissionMethod.Netlify:
      retVal = '/';
    break;
    case SubmissionMethod.FormSubmitCo:
      retVal = fscTarget;
    break;
    case SubmissionMethod.Other:
      // TODO: something else
    break;
    default:

  }
  return retVal;
}


export const handleFormSuccess = (formName, submitType) => {
  console.log('successfully submitted form: ' + formName + ' via type: ' + submitType);
  // TODO: anything
}

export const handleFormFail = (formName, err) => {
  console.log('failed to submit form: ' + formName + ' because: ', err)
  // TODO: other stuff
}
