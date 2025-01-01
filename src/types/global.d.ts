/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@splidejs/react-splide" {
  import { ReactNode } from "react";

  export interface SplideProps {
    options?: Record<string, any>;
    children?: ReactNode;
    [key: string]: any;
  }

  export const Splide: React.FC<SplideProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const SplideSlide: React.FC<{ [key: string]: any }>;
}

declare module "@fullpage/react-fullpage" {
  const ReactFullpage: any;
  export default ReactFullpage;
}
declare const fullpage_api: {
  moveSectionDown: () => void;
  moveSectionUp: () => void;
  [key: string]: any; // Add any additional methods as needed
};
