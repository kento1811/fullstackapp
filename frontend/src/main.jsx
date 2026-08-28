import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { ConversationProvider } from './contexts/conversationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ConversationProvider>
        <App />
      </ConversationProvider>
    </AuthProvider>
  </StrictMode>,
)
