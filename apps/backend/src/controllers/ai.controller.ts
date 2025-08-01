import { DiscussionModel } from '@/models/discussion.model';
import type { Dictionary } from '@/types/dictionary.types';
import type { Tag } from '@/types/tag.types';
import { type KeyPath } from '@intlayer/core';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { getDictionariesByTags } from '@services/dictionary.service';
import * as tagService from '@services/tag.service';
import { getTagsByKeys } from '@services/tag.service';
import {
  AIConfig,
  getAIConfig,
  type AIOptions,
  type ChatCompletionRequestMessage,
} from '@utils/AI/aiSdk';
import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import * as auditContentDeclarationUtil from '@utils/AI/auditDictionary';
import * as auditContentDeclarationFieldUtil from '@utils/AI/auditDictionaryField';
import * as auditContentDeclarationMetadataUtil from '@utils/AI/auditDictionaryMetadata';
import * as auditTagUtil from '@utils/AI/auditTag';
import * as autocompleteUtil from '@utils/AI/autocomplete';
import * as customQueryUtil from '@utils/AI/customQuery';
import * as translateJSONUtil from '@utils/AI/translateJSON';
import { ErrorHandler, type AppError } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import type { Locales } from 'intlayer';

type ReplaceAIConfigByOptions<T> = Omit<T, 'aiConfig'> & {
  aiOptions?: AIOptions;
};

export type CustomQueryBody =
  ReplaceAIConfigByOptions<customQueryUtil.CustomQueryOptions>;
export type CustomQueryResult =
  ResponseData<customQueryUtil.CustomQueryResultData>;

export const customQuery = async (
  req: Request<AuditContentDeclarationBody>,
  res: ResponseWithSession<CustomQueryResult>,
  _next: NextFunction
): Promise<void> => {
  const { aiOptions, tagsKeys, ...rest } = req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: customQueryUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    const auditResponse = await customQueryUtil.customQuery({
      ...rest,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'QUERY_FAILED');
      return;
    }

    const responseData = formatResponse<customQueryUtil.CustomQueryResultData>({
      data: auditResponse,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type TranslateJSONBody = Omit<
  ReplaceAIConfigByOptions<translateJSONUtil.TranslateJSONOptions>,
  'tags'
> & {
  tagsKeys?: string[];
};
export type TranslateJSONResult =
  ResponseData<translateJSONUtil.TranslateJSONResultData>;

export const translateJSON = async (
  req: Request<AuditContentDeclarationBody>,
  res: ResponseWithSession<TranslateJSONResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const { aiOptions, tagsKeys, ...rest } = req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: translateJSONUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys, project.organizationId);
    }

    const auditResponse = await translateJSONUtil.translateJSON({
      ...rest,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      tags,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<translateJSONUtil.TranslateJSONResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AuditContentDeclarationBody = {
  aiOptions?: AIOptions;
  locales: Locales[];
  defaultLocale: Locales;
  fileContent: string;
  filePath?: string;
  tagsKeys?: string[];
};
export type AuditContentDeclarationResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclaration = async (
  req: Request<AuditContentDeclarationBody>,
  res: ResponseWithSession<AuditContentDeclarationResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const { fileContent, filePath, aiOptions, locales, defaultLocale, tagsKeys } =
    req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: auditContentDeclarationUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys, project.organizationId);
    }

    const auditResponse = await auditContentDeclarationUtil.auditDictionary({
      fileContent,
      filePath,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      locales,
      defaultLocale,
      tags,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AuditContentDeclarationFieldBody = {
  aiOptions?: AIOptions;
  locales: Locales[];
  fileContent: string;
  filePath?: string;
  tagsKeys?: string[];
  keyPath: KeyPath[];
};
export type AuditContentDeclarationFieldResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationField = async (
  req: Request<AuditContentDeclarationFieldBody>,
  res: ResponseWithSession<AuditContentDeclarationFieldResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const { fileContent, aiOptions, locales, tagsKeys, keyPath } = req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: auditContentDeclarationFieldUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys, project.organizationId);
    }

    const auditResponse =
      await auditContentDeclarationFieldUtil.auditDictionaryField({
        fileContent,
        aiConfig,
        applicationContext: aiOptions?.applicationContext,
        locales,
        tags,
        keyPath,
      });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AuditContentDeclarationMetadataBody = {
  aiOptions?: AIOptions;
  fileContent: string;
};
export type AuditContentDeclarationMetadataResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationMetadata = async (
  req: Request<AuditContentDeclarationMetadataBody>,
  res: ResponseWithSession<AuditContentDeclarationMetadataResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization } = res.locals;
  const { fileContent, aiOptions } = req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: auditContentDeclarationMetadataUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    const tags: Tag[] = await tagService.findTags(
      {
        organizationId: organization?.id,
      },
      0,
      1000
    );

    const auditResponse =
      await auditContentDeclarationMetadataUtil.auditDictionaryMetadata({
        fileContent,
        aiConfig,
        applicationContext: aiOptions?.applicationContext,
        tags,
      });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AuditTagBody = {
  aiOptions?: AIOptions;
  tag: Tag;
};
export type AuditTagResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditTag = async (
  req: Request<undefined, undefined, AuditTagBody>,
  res: ResponseWithSession<AuditTagResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const { aiOptions, tag } = req.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: aiOptions,
      defaultOptions: auditTagUtil.aiDefaultOptions,
      accessType: ['registered_user', 'apiKey'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  try {
    let dictionaries: Dictionary[] = [];
    if (project?.organizationId) {
      dictionaries = await getDictionariesByTags([tag.key], project.id);
    }

    const auditResponse = await auditTagUtil.auditTag({
      aiConfig,
      dictionaries,
      tag,
      applicationContext: aiOptions?.applicationContext,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AskDocQuestionBody = {
  messages: ChatCompletionRequestMessage[];
  discutionId: string;
};
export type AskDocQuestionResult =
  ResponseData<askDocQuestionUtil.AskDocQuestionResult>;

export const askDocQuestion = async (
  req: Request<undefined, undefined, AskDocQuestionBody>,
  res: ResponseWithSession<AskDocQuestionResult>
) => {
  const { messages, discutionId } = req.body;
  const { user, project, organization } = res.locals;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(res, {
      userOptions: {},
      defaultOptions: askDocQuestionUtil.aiDefaultOptions,
      accessType: ['public'],
    });
  } catch (error) {
    ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
    return;
  }

  // 1. Prepare SSE headers and flush them NOW
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // disable nginx buffering
  res.flushHeaders?.();
  res.write(': connected\n\n'); // initial comment keeps some browsers happy
  res.flush?.();

  // 2. Kick off the upstream stream WITHOUT awaiting it
  askDocQuestionUtil
    .askDocQuestion(messages, aiConfig, {
      onMessage: (chunk) => {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        res.flush?.();
      },
    })
    .then(async (fullResponse) => {
      const lastUserMessageContent = messages.findLast(
        (msg) => msg.role === 'user'
      )?.content;
      const lastUserMessageNbWords = lastUserMessageContent
        ? lastUserMessageContent.split(' ').length
        : 0;
      if (lastUserMessageNbWords > 2) {
        // If the last user message is less than 3 words, don't persist the discussion
        // Example: "Hello", "Hi", "Hey", "test", etc.

        // 3. Persist discussion while the client already has all chunks
        await DiscussionModel.findOneAndUpdate(
          { discutionId },
          {
            $set: {
              discutionId,
              userId: user?.id,
              projectId: project?.id,
              organizationId: organization?.id,
              messages: [
                ...messages.map((msg) => ({
                  role: msg.role,
                  content: msg.content,
                  timestamp: msg.timestamp,
                })),
                {
                  role: 'assistant',
                  content: fullResponse.response,
                  relatedFiles: fullResponse.relatedFiles,
                  timestamp: new Date(),
                },
              ],
            },
          },
          { upsert: true, new: true }
        );
      }

      // 4. Tell the client we're done and close the stream
      res.write(
        `data: ${JSON.stringify({ done: true, response: fullResponse })}\n\n`
      );
      res.end();
    })
    .catch((err) => {
      // propagate error as an SSE event so the client knows why it closed
      res.write(
        `event: error\ndata: ${JSON.stringify({ message: err.message })}\n\n`
      );
      res.end();
    });
};

export type AutocompleteBody = {
  text: string;
  aiOptions?: AIOptions;
  contextBefore?: string;
  currentLine?: string;
  contextAfter?: string;
};

export type AutocompleteResponse = ResponseData<{
  autocompletion: string;
}>;

export const autocomplete = async (
  req: Request<undefined, undefined, AutocompleteBody>,
  res: ResponseWithSession<AutocompleteResponse>
) => {
  try {
    const { text, aiOptions, contextBefore, currentLine, contextAfter } =
      req.body;

    let aiConfig: AIConfig;
    try {
      aiConfig = await getAIConfig(res, {
        userOptions: aiOptions,
        defaultOptions: autocompleteUtil.aiDefaultOptions,
        accessType: ['public'],
      });
    } catch (error) {
      ErrorHandler.handleGenericErrorResponse(res, 'AI_ACCESS_DENIED');
      return;
    }

    const response = (await autocompleteUtil.autocomplete({
      text,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      contextBefore,
      currentLine,
      contextAfter,
    })) ?? {
      autocompletion: '',
      tokenUsed: 0,
    };

    const responseData =
      formatResponse<autocompleteUtil.AutocompleteFileResultData>({
        data: response,
      });

    res.json(responseData);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
