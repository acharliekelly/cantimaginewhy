import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

it('renders the home page with the favicon and gallery request', async () => {
  const root = document.createElement('div');
  const favicon = document.createElement('link');
  favicon.id = 'favicon';
  document.head.appendChild(favicon);
  const originalFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ resources: [] })
  });

  try {
    await act(async () => { ReactDOM.render(<App />, root); });

    expect(root.textContent).toContain('Featured Artwork');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://res.cloudinary.com/cantimaginewhy/image/list/favorite.json'
    );
  } finally {
    act(() => { ReactDOM.unmountComponentAtNode(root); });
    favicon.remove();
    global.fetch = originalFetch;
  }
});
