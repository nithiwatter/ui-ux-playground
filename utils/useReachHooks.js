import React from 'react';
import { useHover } from '@use-gesture/react';

function useReachPopoverMenu() {
  const isOpen = React.useRef(false);
  const buttonRef = React.useRef();
  const popoverRef = React.useRef();

  const dispatchMouseDown = () => {
    const mousedownEvent = new MouseEvent('mousedown', {
      // copy all details of native mousedown event
      // except isTrusted - readonly property from dispatchEvent()
      // browser heuristics would somehow make this apply focus-visible (no way out?) - inconsistent after some testing!

      // basically, the any hovering (before the first manual click on the button) is treated as a keyboard input -> focus-visible menu
      // after the first manual click, all later hoverings are treated as mouse clicks -> not focus-visible menu
      // no way around this unless could somehow modify isTrusted readonly property to true?
      bubbles: true,
      button: 0,
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

  return { isOpen, buttonRef, popoverRef, bind: bindPopover };
}

export { useReachPopoverMenu };
