import { ReactNode } from "react";

type MainWrapProps = {
  children: ReactNode;
};

const MainWrap = ({ children }: MainWrapProps) => {
  return (
    <main className="main-wrap">
      {children}
    </main>
  );
};

export default MainWrap;
