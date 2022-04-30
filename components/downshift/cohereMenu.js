import React from 'react';
import clsx from 'clsx';
import { useSelect } from 'downshift';
import { useHover } from '@use-gesture/react';

// more customization options but still having trouble with not triggering focus-visible when hovering - probably not going to be able to solve it
// reach menu probably the best option at this point!

const items = ['Option 1', 'Option 2', 'Option 3'];

function CohereMenu() {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
  } = useSelect({
    items,
    id: 'cohere-menu-0',
    onSelectedItemChange: (changes) => {
      console.log(changes.selectedItem);
    },
  });
  const bindPopover = useHover(({ active: hovering }) => {
    console.log('hovering:', hovering);

    if (hovering) {
      if (isOpen) return;
      openMenu();
    } else {
      if (!isOpen) return;
      closeMenu();
    }
  });

  return (
    <div {...bindPopover()} className="relative w-fit">
      <button
        {...getToggleButtonProps()}
        className="rounded-lg bg-blue-500 p-2"
      >
        Click Me
      </button>
      <ul
        {...getMenuProps()}
        className={clsx(
          'absolute w-48 rounded-lg bg-white shadow-md',
          isOpen && 'p-2'
        )}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CohereMenu;
