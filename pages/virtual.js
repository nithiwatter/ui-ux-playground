import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { v4 as uuid } from "uuid";

import { useMounted } from "../components/rest-hooks/hooks";

const rows = new Array(10000).fill(true).map(() => ({
  id: uuid(),
  content: Math.random(),
}));

function RowItem({ index, item, deleteItem, measure }) {
  const [expanded, setExpanded] = useState(false);
  const childRef = useRef();

  return (
    <div className="m-2 bg-blue-500 p-2 text-white" ref={childRef}>
      Row {index} {item.id}: {item.content}
      <button
        className="ml-2 bg-blue-400"
        onClick={() => {
          setExpanded(!expanded);
          measure(childRef.current);
        }}
      >
        Expand me!
      </button>
      <button className="ml-2 bg-red-400" onClick={() => deleteItem(item)}>
        Delete me!
      </button>
      {expanded && (
        <div className="m-2 bg-purple-500 p-2 text-white">I am expanded</div>
      )}
    </div>
  );
}

function VirtualList() {
  const [virtualState, setVirtualState] = useState(rows);

  const deleteItem = (item) => {
    setVirtualState((prev) => prev.filter((e) => e.id !== item.id));
  };

  // The scrollable element for your list
  const parentRef = useRef();

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: virtualState.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    getItemKey: (index) => virtualState[index].id,
    debug: true,
  });

  console.log({
    totalSiz: rowVirtualizer.getTotalSize(),
    virtualItemsLength: rowVirtualizer.getVirtualItems().length,
  });

  return (
    <>
      <div className="m-2 bg-green-300 text-white">
        Total length: {virtualState.length}
      </div>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: "auto", // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              ref={virtualRow.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <RowItem
                index={virtualRow.index}
                item={virtualState[virtualRow.index]}
                deleteItem={deleteItem}
                measure={virtualRow.measureElement}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Virtual() {
  const { mounted } = useMounted();

  if (!mounted) return <></>;

  return <VirtualList />;
}
