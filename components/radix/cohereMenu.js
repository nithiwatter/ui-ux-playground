import React from 'react';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const RadixNextLink = React.forwardRef(
  ({ option, href = '#', ...linkProps }, forwardedRef) => {
    // linkProps contain Radix attributes and other custom props
    // next/link as of 12.1.5 is not a React.forwardRef
    return (
      <NextLink href={href}>
        <a ref={forwardedRef} {...linkProps}>
          {option}
        </a>
      </NextLink>
    );
  }
);

RadixNextLink.displayName = 'RadixNextLink';

function CohereMenu() {
  // open bug with closing menu via client-side links
  const [value, setValue] = React.useState('');
  // need to pass this to all NavigationMenu.Link to fix the bug
  // temporary hack - there is still a bug with clicking the a link via Enter key
  // in that case, the menu does close, but any movement after opens and closes the menu quickly again
  const onClick = () => setValue('');

  // the package also does not use portal or handle positioning (need to write custom CSS to handle this) - probably too beta - too early to use to be honest
  // maybe use the already-tested dropdown version of this
  return (
    <>
      <NavigationMenu.Root
        value={value}
        onValueChange={(value) => {
          setValue(value);
        }}
      >
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger asChild>
              <button className="rounded-lg bg-blue-500 p-2">Click Me</button>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link asChild onClick={onClick}>
                <RadixNextLink
                  href="#"
                  option="Option 1"
                  className="block bg-green-300 focus:ring-2"
                />
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild onClick={onClick}>
                <RadixNextLink
                  href="#2"
                  option="Option 2"
                  className="block bg-green-300 focus:ring-2"
                />
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
}

export default CohereMenu;
