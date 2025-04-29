import { http as rest } from 'msw';

export const handlers = [
  rest.post('http://test-api.com/api/token/', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (!email || !password) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email and password are required' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        user: { id: 1, username: 'testdfsdfsdf', email },
        tokens: { access: 'access-token', refresh: 'refresh-token' },
      })
    );
  }),
  rest.post('http://test-api.com/api/register/', async (req, res, ctx) => {
    const { username, email, password, password2 } = await req.json();
    if (!username || !email || !password || password !== password2) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Invalid registration data' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({ message: 'Registration successful' })
    );
  }),
];