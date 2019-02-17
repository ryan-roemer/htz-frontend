import React from 'react';
import { FelaComponent, } from 'react-fela';
import ClickArea from '../ClickArea/ClickArea';
import hoverableButtonRule from '../ClickArea/hoverableButtonRule';
import IconReading from '../Icon/icons/IconReading';
import HtzLink from '../HtzLink/HtzLink';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

export default function MastheadReadingList() {
  return (
    <FelaComponent
      rule={hoverableButtonRule}
      render={({ theme, className, }) => {
        const { url, a11yText, } = theme.readingListMenuI18n;
        return (
          <FelaComponent
            rule={hoverableButtonRule}
            render={({ theme, className, }) => (
              <HtzLink
                attrs={{ 'aria-describedby': 'masthead-reading-list-link', }}
                className={className}
                href={url}
              >
                <ClickArea href={url} tagName="span" size={6}>
                  <IconReading size={3.5} />
                </ClickArea>
                <VisuallyHidden id="masthead-reading-list-link">{a11yText}</VisuallyHidden>
              </HtzLink>
            )}
          />
        );
      }}
    />
  );
}
