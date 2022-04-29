import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
} from '@reach/menu-button';

import { useReachPopoverMenu } from '../../utils/useReachHooks';

function CohereMenu() {
  const { isOpen, buttonRef, popoverRef, bind } = useReachPopoverMenu();

  return (
    <Menu>
      {({ isExpanded }) => {
        isOpen.current = isExpanded;

        return (
          <div ref={popoverRef} {...bind()} className="w-fit">
            <MenuButton className="rounded-lg bg-[#fcfbf8] px-4 py-2 font-semibold text-[#625a41] focus-visible:outline-none">
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
                      console.log('Option 1');
                    }}
                  >
                    <h2 className="text-lg text-[#1b1b1b]">Answers</h2>
                    <p className="text-[#625a41]">
                      Automatically answer repetitive questions with the content
                      you already have
                    </p>
                  </MenuItem>
                  <MenuItem
                    onSelect={() => {
                      console.log('Option 2');
                    }}
                  >
                    <h2 className="text-lg text-[#1b1b1b]">SmartRoute</h2>
                    <p className="text-[#625a41]">
                      Boost handle times by eliminating unnecessary transfers
                    </p>
                  </MenuItem>
                  <MenuItem
                    onSelect={() => {
                      console.log('Option 3');
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
  );
}

export default CohereMenu;
