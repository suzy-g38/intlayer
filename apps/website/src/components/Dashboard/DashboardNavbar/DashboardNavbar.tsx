'use client';

import { type ExternalLinks, PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import { Container, Logo, TabSelector } from '@intlayer/design-system';
import { useAuth, useDevice } from '@intlayer/design-system/hooks';
import { useLocale } from 'next-intlayer';
import dynamic from 'next/dynamic';
import { type FC, type ReactNode } from 'react';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

const SwitchThemeSwitcher = dynamic(
  () =>
    import('@components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
      (mod) => mod.SwitchThemeSwitcher
    ),
  { ssr: false }
);

export type NavbarProps = {
  links: {
    url: string | PagesRoutes | ExternalLinks;
    label: string;
    title: ReactNode;
  }[];
};

const getCleanTabSelector = (path: string): string => {
  // Remove leading "/" if present
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // Split the path into components
  const components = path.split('/');

  // If more than two components, keep only the first two
  if (components.length > 2) {
    return components.slice(0, 2).join('/');
  }

  // For single component "dashboard", you can choose to append "/"
  if (components.length === 1 && components[0] === 'dashboard') {
    return components[0]; // or return components[0] + "/";
  }

  // Return the path as is for other cases
  return path;
};

const shouldHaveOrganizationRoutes = [
  PagesRoutes.Dashboard_Projects,
  PagesRoutes.Dashboard_Tags,
] as string[];

const shouldHaveProjectRoutes = [
  PagesRoutes.Dashboard_Editor,
  PagesRoutes.Dashboard_Content,
] as string[];

export const DashboardNavbar: FC<NavbarProps> = ({ links }) => {
  const { pathWithoutLocale } = useLocale();
  const { session } = useAuth();
  const { organization, project } = session ?? {};
  const { isMobile } = useDevice('sm');

  const filteredLinks = links
    .filter(
      (el) => !shouldHaveOrganizationRoutes.includes(el.url) || !!organization
    )
    .filter((el) => !shouldHaveProjectRoutes.includes(el.url) || !!project);

  return (
    <Container className="z-50 flex flex-col gap-3 p-4" roundedSize="none">
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-4">
          <Link href={PagesRoutes.Home} label="Dashboard" color="text">
            <Logo className="size-6" />
          </Link>
          {!isMobile && (
            <div className="flex w-auto items-center gap-4">
              {organization && (
                <>
                  <span>/</span>
                  <OrganizationDropdown />
                </>
              )}
              {project && (
                <>
                  <span>/</span>
                  <ProjectDropdown />
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher panelProps={{ className: '-left-16' }} />
          <SwitchThemeSwitcher />
          <ProfileDropDown />
        </div>
      </div>
      {isMobile && (
        <div className="flex w-full items-center gap-4">
          {organization && <OrganizationDropdown />}
          {project && (
            <>
              <span>/</span>
              <ProjectDropdown align="end" />
            </>
          )}
        </div>
      )}

      <div className="max-3 flex w-full items-center gap-8 overflow-x-auto max-sm:pb-4">
        <TabSelector
          selectedChoice={getCleanTabSelector(pathWithoutLocale)}
          tabs={filteredLinks.map(({ url, label, title }) => (
            <Link
              key={getCleanTabSelector(url)}
              href={url}
              label={label}
              color="text"
              variant="invisible-link"
              className="flex px-4 py-0.5"
              aria-current={
                getCleanTabSelector(pathWithoutLocale) === url
                  ? 'page'
                  : undefined
              }
            >
              {title}
            </Link>
          ))}
          hoverable
          color="text"
        />
      </div>
    </Container>
  );
};
