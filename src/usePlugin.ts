import { RefObject, useCallback, useEffect } from "react";
import { SkedifyConfig } from "./types";

const defaultConfig: SkedifyConfig = {
  // @ts-ignore
  "oauth.client": import.meta.env.VITE_CLIENT_ID,
  "customer.timezone": "Europe/Copenhagen",
  flow: "SOTQC",
};

export function usePlugin(plugin: RefObject<HTMLDivElement>) {
  const loadScript = useCallback((plugin: HTMLDivElement) => {
    const script = document.createElement("script");

    script.src = `https://plugin.k8s.skedify.io/ironman/skedify-plugin.js`;
    script.defer = true;
    plugin.appendChild(script);
  }, []);

  const setConfig = useCallback((plugin: HTMLDivElement) => {
    Object.entries(defaultConfig).forEach(([key, value]) => {
      plugin.setAttribute(`skedify:${key}`, value);
    });
  }, []);

  const createNewInstance = useCallback(
    (plugin: HTMLDivElement) => {
      try {
        window.Skedify.Plugin(plugin);
      } catch (error) {
        console.error(error);
      }
    },
    [window.Skedify]
  );

  function reload() {
    if (plugin.current && window.Skedify.Plugin) {
      createNewInstance(plugin.current);
    }
  }

  useEffect(() => {
    if (plugin.current != null) {
      setConfig(plugin.current);
      loadScript(plugin.current);
    }
  }, [createNewInstance, loadScript, plugin, setConfig]);

  return { reload };
}
