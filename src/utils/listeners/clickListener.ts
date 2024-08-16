export const addClickListener = (callback: () => void) => {
    document.addEventListener('click', callback);
  };
  
  export const removeClickListener = (callback: () => void) => {
    document.removeEventListener('click', callback);
  };