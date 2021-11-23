type ReactQueryProps = {
  refetchOnWindowFocus: boolean,
  cacheTime: number,
  refetchOnReconnect: boolean,
  retry: number,
}

const reactQueryConfig: ReactQueryProps = {
  refetchOnWindowFocus: false,
  cacheTime: Infinity,
  refetchOnReconnect: true,
  retry: 0,
};

export default reactQueryConfig;
