/**
 * Create section component.
 *
 * @param {HTMLElement} sectionElem
 *
 * @returns {HTMLElement}
 */
export function createComponent(sectionElem) {
  const templateElem = sectionElem.querySelector('.app-tmp-number-component');

  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  const inputListContainer = sectionElem.querySelector('.app-cmp-number-list');

  if (inputListContainer === null) {
    throw new Error('Input list container .app-cmp-number-list is not found');
  }

  const regenerateTitleNumbersAndStatus = () => {
    [...inputListContainer.querySelectorAll('.app-cmp-number')].forEach(
      (inputContainer, index, items) => {
        [...inputContainer.querySelectorAll('.app-title-number')].forEach(
          (elem) => (elem.textContent = ` ${index + 1} ::`),
        );

        [
          ...inputContainer.querySelectorAll('.app-cmd-remove-number-input'),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      },
    );
  };

  const recalculateResult = () => {
    const result = [
      ...inputListContainer.querySelectorAll('.app-inp-number'),
    ].reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    [...sectionElem.querySelectorAll('.app-out-number')].forEach(
      (elem) => (elem.textContent = result.toLocaleString()),
    );
  };

  const createInputComponent = () => {
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    inputContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-number-input') ?? false) {
        inputContainer.remove();

        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    inputListContainer.append(inputContainer);

    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  sectionElem.addEventListener('change', (ev) => {
    if (ev.target?.matches('.app-inp-number') ?? false) {
      recalculateResult();
    }
  });

  sectionElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-number-input')) {
      createInputComponent();
    }
  });

  createInputComponent();

  return sectionElem;
}
