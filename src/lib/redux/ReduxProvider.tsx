"use client";
import { Provider } from "react-redux";
import store from "./"; // Adjust the import path to your store

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
