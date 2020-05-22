import { DirectiveOptions } from 'vue';

export const selectAll: DirectiveOptions = {
  inserted(el) {
    // declare input as HTMLInputElement to use value and select (typescript tips - cast type)
    const input = el.querySelector('.q-field__native') as HTMLInputElement;
    if (input != null) {
      // select all text if not empty
      input.addEventListener('focus', () => {
        if (input.value.length) {
          input.select();
        }
      });
    }
  }
};
