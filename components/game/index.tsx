import { Unity, useUnityContext } from 'react-unity-webgl';

export function Game() {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'game/Build/Build.loader.js',
    dataUrl: 'game/Build/Build.data.br',
    frameworkUrl: 'game/Build/Build.framework.js.br',
    codeUrl: 'game/Build/Build.wasm.br',
  });

  return <Unity unityProvider={unityProvider} />;
}
