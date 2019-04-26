import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { PreformattedText } from '..'; // @edekadigital/backoffice-ui

const textContent = `
<appender name="fileAppenderRoot" class="org.apache.log4j.FileAppender">
    <param name="file" value="\${log.location}/logFile.log" />
    <layout class="org.apache.log4j.PatternLayout">
        <param name="ConversionPattern" value="%d{ISO8601} %-5p [%c{1}] - %m%n" />
    </layout>
</appender>
`.trim();

storiesOf('Typography|PreformattedText', module).add('default', () => (
  <PreformattedText>{textContent}</PreformattedText>
));
