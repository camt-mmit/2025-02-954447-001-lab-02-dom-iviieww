import { createComponent as createSectionComponent } from './lab-input-list-component.js';

const regenerateSectionTitleNumbersAndStatus = (appContainer) => {
  const sectionList = [...appContainer.querySelectorAll('.app-cmp-section')];
  const totalSections = sectionList.length;

  sectionList.forEach((sectionContainer, index) => {
    [...sectionContainer.querySelectorAll('.app-title-section-number')].forEach(
      (elem) => (elem.textContent = `Section ${index + 1}`),
    );

    [...sectionContainer.querySelectorAll('.app-cmd-remove-section')].forEach(
      (elem) => (elem.disabled = totalSections === 1),
    );
  });
};

const createSection = (appContainer) => {
  const templateElem = appContainer.querySelector('.app-tmp-section-component');

  if (templateElem === null) {
    throw new Error('Template .app-tmp-section-component is not found');
  }

  const sectionNode = templateElem.content.cloneNode(true).firstElementChild;

  const sectionContainer = createSectionComponent(sectionNode);

  sectionContainer.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-remove-section') ?? false) {
      sectionContainer.remove();
      regenerateSectionTitleNumbersAndStatus(appContainer);
    }
  });

  appContainer.append(sectionContainer);

  regenerateSectionTitleNumbersAndStatus(appContainer);
};

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app-cmp-section-list');

  if (appContainer === null) {
    throw new Error(
      'App container .app-cmp-section-list is not found. Check if the root element has the correct class.',
    );
  }

  appContainer.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createSection(appContainer);
    }
  });

  createSection(appContainer);
});
