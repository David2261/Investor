import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../src/__mocks__/server.ts';
import { ReadableStream, WritableStream, TransformStream } from 'web-streams-polyfill';

global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());