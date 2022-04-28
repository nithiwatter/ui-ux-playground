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

  return { isOpen, buttonRef, popoverRef, bind: bindPopover };
}

export { useReachPopoverMenu };
