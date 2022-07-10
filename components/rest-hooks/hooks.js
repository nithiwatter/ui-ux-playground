import React from "react";

function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted };
}

function useRerender() {
  const [s, setS] = React.useState(0);

  const onClick = () => setS(s + 1);

  return { onClick };
}

function useSwitch(defaultOn) {
  const [on, setOn] = React.useState(!!defaultOn);

  const onClick = () => setOn(!on);

  return { on, onClick };
}

export { useMounted, useRerender, useSwitch };
