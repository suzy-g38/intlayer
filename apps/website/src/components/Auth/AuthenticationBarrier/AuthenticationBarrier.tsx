import { PagesRoutes } from '@/Routes';
import { getQueryParams } from '@utils/queryMiddleware';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import { type FC } from 'react';
import { AuthenticationBarrierClient } from './AuthenticationBarrierClient';
import { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
import { AuthenticationBarrierProps as AuthenticationBarrierPropsBoth } from './accessValidation';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsBoth,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
  locale: LocalesValues;
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = async ({
  children,
  redirectionRoute,
  locale,
  ...props
}) => {
  const redirectionURLQuery = await getQueryParams();
  const redirectURL =
    redirectionRoute ?? redirectionURLQuery ?? PagesRoutes.Home;
  const localizedRedirectionURL = getLocalizedUrl(redirectURL, locale);

  return (
    <AuthenticationBarrierServer
      {...props}
      redirectionRoute={localizedRedirectionURL}
      isEnabled={false} // TODO: remove this. Make infinite redirection loop
    >
      <AuthenticationBarrierClient
        {...props}
        redirectionRoute={localizedRedirectionURL}
      >
        {children}
      </AuthenticationBarrierClient>
    </AuthenticationBarrierServer>
  );
};
