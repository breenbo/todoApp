import { Dialog, Loading } from 'quasar';

export function showErrorMessage(errorMessage: string): void {
  // hide loader on error when log in
  Loading.hide();
  Dialog.create({
    title: 'Error',
    message: errorMessage
  });
}
