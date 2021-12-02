import React, { MouseEvent } from "react";
import { Anchor, AnchorProps } from "react-bootstrap";
import { LinkProps, To, useHref, useLinkClickHandler } from "react-router-dom";

interface AppAnchorProps extends AnchorProps {
  to: To;
}

export default function AppAnchor(props: AppAnchorProps) {
  const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
      let href = useHref(to);
      let handleClick = useLinkClickHandler(to, {
        replace,
        state,
        target,
      });

      return (
        <Anchor
          {...rest}
          href={href}
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              handleClick(event);
            }
          }}
          ref={ref}
        />
      );
    }
  );
  return <Link {...props}>{props.children}</Link>;
}
