import React from "react";

import MentionsEditor from "../components/tiptap/MentionsEditor";

export default function Tiptap() {
  return (
    <>
      <div>Tiptap Experimental Editor:</div>
      <div className="p-2">
        <MentionsEditor />
      </div>
    </>
  );
}
