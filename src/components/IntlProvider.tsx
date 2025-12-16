import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

interface IntlContext {
  dateTimeFormat?: Intl.DateTimeFormat;
}

const intlContext = createContext<IntlContext>({});

export function IntlProvider(props: PropsWithChildren) {
  const dateTimeFormat = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeZone: "Asia/Shanghai",
    });
  }, []);
  const contextValue = useMemo(() => {
    return {
      dateTimeFormat,
    };
  }, [dateTimeFormat]);

  return (
    <intlContext.Provider value={contextValue}>
      {props.children}
    </intlContext.Provider>
  );
}

export function useDateTimeFormat() {
  const { dateTimeFormat } = useContext(intlContext);
  if (!dateTimeFormat) {
    throw new Error("`IntlProvider` component is missing");
  }
  return dateTimeFormat;
}
