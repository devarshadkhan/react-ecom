"use client";

import React from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar";
interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        {children}
        </Provider>
    </>
  );
};

export default GlobalLayout;
