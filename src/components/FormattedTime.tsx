import type { JSX } from "react";
import { useDateTimeFormat } from "./IntlProvider";

type FormattedTimeProps = {
  dateTime: Date;
} & Omit<JSX.IntrinsicElements["time"], "dateTime">;

export function FormattedTime({ dateTime, ...props }: FormattedTimeProps) {
  const dateTimeFormat = useDateTimeFormat();
  return (
    <time {...props} dateTime={dateTime.toISOString()}>
      {dateTimeFormat.format(dateTime)}
    </time>
  );
}
