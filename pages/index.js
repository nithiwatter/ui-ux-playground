import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
} from '@reach/menu-button';
import { useHover } from '@use-gesture/react';

export default function Home() {
  const isOpen = React.useRef(false);
  const buttonRef = React.useRef();
  const popoverRef = React.useRef();

  const dispatchMouseDown = () => {
    const mousedownEvent = new MouseEvent('mousedown', {
      // copy all details of native mousedown event
      // except isTrusted - readonly property from dispatchEvent()
      // browser heuristics would somehow make this apply focus-visible (no way out?) - inconsistent after some testing!
      bubbles: true,
      buttons: 1,
      cancelable: true,
      detail: 1,
    });
    buttonRef.current.dispatchEvent(mousedownEvent);
  };

  const bindPopover = useHover(({ active: hovering }) => {
    if (hovering) {
      if (isOpen.current) return;
      dispatchMouseDown();
    } else {
      if (!isOpen.current) return;
      dispatchMouseDown();
    }
  });

  return (
    <div className="bg-slate-800 p-8">
      <Menu>
        {({ isExpanded }) => {
          isOpen.current = isExpanded;

          return (
            <div ref={popoverRef} {...bindPopover()} className="w-fit">
              <MenuButton className="rounded-lg bg-[#fcfbf8] px-4 py-2 font-semibold text-[#625a41] focus:outline-none">
                <div ref={buttonRef}>
                  Platform
                  {isExpanded ? (
                    <span aria-hidden> ▲</span>
                  ) : (
                    <span aria-hidden> ▼</span>
                  )}
                </div>
              </MenuButton>
              <MenuPopover className="pt-2">
                <div className="w-96 rounded-lg bg-white p-2 shadow-lg">
                  <MenuItems>
                    <MenuItem
                      onSelect={() => {
                        console.log('download');
                      }}
                    >
                      <h2 className="text-lg text-[#1b1b1b]">Answers</h2>
                      <p className="text-[#625a41]">
                        Automatically answer repetitive questions with the
                        content you already have
                      </p>
                    </MenuItem>
                  </MenuItems>
                  <MenuItems>
                    <MenuItem
                      onSelect={() => {
                        console.log('copy');
                      }}
                    >
                      <h2 className="text-lg text-[#1b1b1b]">SmartRoute</h2>
                      <p className="text-[#625a41]">
                        Boost handle times by eliminating unnecessary transfers
                      </p>
                    </MenuItem>
                  </MenuItems>
                  <MenuItems>
                    <MenuItem
                      onSelect={() => {
                        console.log('paste');
                      }}
                    >
                      <h2 className="text-lg text-[#1b1b1b]">Cobrowse</h2>
                      <p className="text-[#625a41]">
                        Visually guide customers over phone or chat
                      </p>
                    </MenuItem>
                  </MenuItems>
                </div>
              </MenuPopover>
            </div>
          );
        }}
      </Menu>
    </div>
  );
}
