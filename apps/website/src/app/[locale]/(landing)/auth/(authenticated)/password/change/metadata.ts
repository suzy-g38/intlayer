import { PagesRoutes } from '@/Routes';
import { getDictionary, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { type LocalPromiseParams } from 'next-intlayer';
import metadataContent from './metadata.content';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getDictionary(
    metadataContent,
    locale
  );
  return {
    title,
    description,

    keywords,
    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.Auth_ChangePassword, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Auth_ChangePassword),
        'x-default': PagesRoutes.Auth_ChangePassword,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ChangePassword}`,
        locale
      ),
      title,
      description,
    },
  };
};
