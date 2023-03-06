import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input'),
  messageInput: document.querySelector('.feedback-form textarea'),
};

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
  const formData = {
    email: refs.emailInput.value,
    message: refs.messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  localStorage.removeItem(STORAGE_KEY);
  const state = {
    email: refs.emailInput.value,
    message: refs.messageInput.value,
  };
  console.log(state);
  evt.target.reset();
}

function loadFormData() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(savedMessage);
  if (savedMessage) {
    refs.emailInput.value = data.email;
    refs.messageInput.value = data.message;
  }
}

loadFormData();
