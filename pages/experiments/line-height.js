import React from 'react';

function LineHeight() {
  // the green box has the same line height as the content area (green background)
  // therefore, its bottom of the line box (same as the bottom edge of the green background) will be aligned with the linebox of the strut of the parent
  // the strut of the parent has a line height of 10px
  // check the red background, this 10px line box is centered within that
  // overall, the height of the div is the computed line box enclosing both the 127.2px and 10px, where their bottom edges are aligned
  // of course, the red background will overflow because the content area (24px) is larger than its line box of 10px
  return (
    <>
      <div className="bg-blue-500 text-lg leading-[10px]">
        test
        <span className="bg-red-500">test</span>
        <span className="bg-green-500 align-bottom text-8xl leading-[127.2px]">
          Hello
        </span>
      </div>
    </>
  );
}

export default LineHeight;
