import React, { MouseEvent } from "react";
import { NavLink, NavLinkProps } from "react-bootstrap";
import { LinkProps, To, useHref, useLinkClickHandler } from "react-router-dom";

interface AppNavLinkProps extends NavLinkProps {
  to: To;
}

export default function AppNavLink(props: AppNavLinkProps) {
  const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
      let href = useHref(to);
      let handleClick = useLinkClickHandler(to, {
        replace,
        state,
        target,
      });

      return (
        <NavLink
          {...rest}
          href={href}
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              handleClick(event);
            }
          }}
          ref={ref}
          target={target}
        />
      );
    }
  );
  return <Link {...props}>{props.children}</Link>;
}
