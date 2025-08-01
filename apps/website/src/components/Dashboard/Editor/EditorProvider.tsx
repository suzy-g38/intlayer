'use client';

import type { IntlayerConfig } from '@intlayer/config/client';
import { Loader } from '@intlayer/design-system';
import { useAuth } from '@intlayer/design-system/hooks';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, type RefObject } from 'react';

type EditorProviderProps = {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  configuration?: IntlayerConfig;
};

/**
 * Provider that store the current locale on the client side
 */
export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  iframeRef,
  configuration,
}) => {
  const { session } = useAuth();
  const intlayerConfig =
    configuration ?? (session?.project?.configuration as IntlayerConfig);
  const applicationURL = intlayerConfig?.editor.applicationURL ?? '*';

  if (!intlayerConfig) return <Loader />;

  return (
    <EditorProviderComponent
      postMessage={(data) => {
        iframeRef.current?.contentWindow?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          applicationURL
        );
      }}
      allowedOrigins={[applicationURL]}
      mode="editor"
      configuration={intlayerConfig}
    >
      {children}
    </EditorProviderComponent>
  );
};
