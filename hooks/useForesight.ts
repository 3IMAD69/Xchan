import {
  ForesightManager,
  type ForesightRegisterOptionsWithoutElement,
  type ForesightRegisterResult,
} from "js.foresight";
import { useEffect, useRef, useState } from "react";

export default function useForesight<T extends HTMLElement = HTMLElement>(
  options: ForesightRegisterOptionsWithoutElement
) {
  const elementRef = useRef<T>(null);
  const [registerResults, setRegisterResults] =
    useState<ForesightRegisterResult | null>(null);

  // Use a ref to store the latest options without triggering re-renders
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const result = ForesightManager.instance.register({
      element: elementRef.current,
      ...optionsRef.current,
    });

    setRegisterResults(result);

    return () => {
      result.unregister();
    };
  }, []);

  return { elementRef, registerResults };
}
