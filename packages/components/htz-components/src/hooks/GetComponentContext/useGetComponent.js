import { createContext, useContext, } from 'react';

export const GetComponentContext = createContext(null);
export const GetComponentProvider = GetComponentContext.Provider;
export const GetComponentConsumer = GetComponentContext.Consumer;

export default function useGetComponent() {
  return useContext(GetComponentContext);
}
