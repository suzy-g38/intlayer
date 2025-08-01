'use client';

import { PagesRoutes } from '@/Routes';
import { OptionalLink } from '@components/DocPage/DocNavList';
import { SearchTrigger } from '@components/DocPage/Search/SearchTrigger';
import {
  Accordion,
  Button,
  ClickOutsideDiv,
  Container,
  MaxWidthSmoother,
} from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { ArrowLeftToLine } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import type { Section } from './types';

type BlogNavListProps = {
  blogData: Section;
  activeSections: string[];
};

export const BlogNavListContent: FC<BlogNavListProps> = ({
  blogData,
  activeSections,
}) => {
  const { docButton } = useIntlayer('blog-nav-list');

  return (
    <nav className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-5 overflow-auto px-3 pb-20 pt-8">
      {Object.keys(blogData).map((key1) => {
        const section1Data = blogData[key1];
        const sectionDefault = section1Data.default;
        const subSections = section1Data.subSections;
        const isActive = key1 === activeSections[0];

        return (
          <div key={key1}>
            <OptionalLink
              href={sectionDefault?.relativeUrl ?? ''}
              className="p-0 pl-3"
              label={key1}
              isActive={isActive}
            >
              {section1Data.title}
            </OptionalLink>

            {subSections && Object.keys(subSections).length > 0 && (
              <ul className="border-neutral mt-4 flex flex-col gap-4 border-l-[0.5px] p-1 text-base">
                {Object.keys(subSections).map((key2) => {
                  const section2Data = subSections[key2];
                  const sectionDefault = section2Data.default;
                  const subSections2 = section2Data.subSections;
                  const hasSubsections =
                    subSections2 && Object.keys(subSections2).length > 0;
                  const isActive =
                    key1 === activeSections[0] && key2 === activeSections[1];

                  return (
                    <li key={key2}>
                      {hasSubsections ? (
                        <Accordion
                          header={
                            <OptionalLink
                              label={key2}
                              href={sectionDefault?.relativeUrl ?? ''}
                              isActive={isActive}
                            >
                              {section2Data?.title}
                            </OptionalLink>
                          }
                          label={key2}
                          isOpen={isActive}
                          className="!py-0 !pl-0"
                        >
                          <div className="pl-3 text-sm">
                            {subSections2 &&
                              Object.keys(subSections2).length > 0 && (
                                <div className="text-neutral hover:text-text flex flex-col items-start gap-2 p-1 transition-colors">
                                  {Object.keys(subSections2).map((key3) => {
                                    const section3Data = subSections2[key3];

                                    const isActive =
                                      key1 === activeSections[0] &&
                                      key2 === activeSections[1] &&
                                      key3 === activeSections[2];

                                    return (
                                      <OptionalLink
                                        key={key3}
                                        label={key3}
                                        href={
                                          section3Data.default?.relativeUrl ??
                                          ''
                                        }
                                        isActive={isActive}
                                      >
                                        {section3Data.title}
                                      </OptionalLink>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                        </Accordion>
                      ) : (
                        <OptionalLink
                          href={sectionDefault?.relativeUrl ?? ''}
                          className="hover:text-text block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors"
                          label={key2}
                          isActive={isActive}
                        >
                          {section2Data?.title}
                        </OptionalLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
      <div>
        <OptionalLink href={PagesRoutes.Doc} label={docButton.label.value}>
          {docButton?.text}
        </OptionalLink>
      </div>
    </nav>
  );
};

export const BlogNavList: FC<BlogNavListProps> = ({
  blogData,
  activeSections,
}) => {
  const { isMobile } = useDevice();
  const [isHidden, setIsHidden] = useState(isMobile);
  const { collapseButton } = useIntlayer('blog-nav-list');

  return (
    <ClickOutsideDiv
      className="left-0 top-0 z-10 flex h-full justify-end max-md:fixed"
      onClickOutSide={() => {
        if (isMobile) {
          setIsHidden(true);
        }
      }}
    >
      <Container className="h-full" roundedSize="none" transparency="sm">
        <div className="relative h-full max-w-80">
          <Container
            transparency="sm"
            className="sticky top-[3.6rem] z-10 m-auto pt-4"
            roundedSize="none"
          >
            <div
              className={cn([
                'relative m-auto flex w-full flex-row items-center justify-end gap-2 px-2',
                isHidden && 'flex-col-reverse',
                !isHidden && 'pl-6',
              ])}
            >
              <SearchTrigger isMini={isHidden} />
              <Button
                Icon={ArrowLeftToLine}
                size="icon-md"
                variant="hoverable"
                color="text"
                label={collapseButton.label.value}
                className={cn([
                  'transition-transform',
                  isHidden && 'rotate-180',
                ])}
                onClick={() => setIsHidden((isHidden) => !isHidden)}
              />
              <div className="from-card/90 absolute bottom-0 left-0 h-8 w-full translate-y-full bg-gradient-to-b backdrop-blur" />
            </div>
          </Container>

          <div className="sticky top-28 pt-0">
            <MaxWidthSmoother isHidden={isHidden ?? false}>
              <div className="relative overflow-hidden">
                <BlogNavListContent
                  blogData={blogData}
                  activeSections={activeSections}
                />
              </div>
            </MaxWidthSmoother>
          </div>
        </div>
      </Container>
    </ClickOutsideDiv>
  );
};

export default BlogNavList;
