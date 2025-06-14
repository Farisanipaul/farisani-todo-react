import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const initializedStore = makeStore();
    setStore(initializedStore);
  }, []);

  if (store === null) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
