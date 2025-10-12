# Google Authentication Setup Guide for Fessor

This guide will walk you through setting up Google authentication for the Fessor application.

## 🔧 Firebase Console Configuration

### Step 1: Enable Google Sign-In Method

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your Fessor project
3. Go to **Authentication** → **Sign-in method**
4. Click on **Google** in the Sign-in providers list
5. Click **Enable**
6. Configure the following:
   - **Public-facing name**: "Fessor - Sistema de Relatórios"
   - **Project support email**: Your email address
   - **Web SDK configuration**: Leave as default
7. Click **Save**

### Step 2: Configure OAuth Consent Screen (Google Cloud Console)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Go to **APIs & Services** → **OAuth consent screen**
4. Configure the following:
   - **User Type**: External (for testing) or Internal (for organization use)
   - **Application name**: "Fessor"
   - **User support email**: Your email
   - **Application homepage**: Your app's URL (e.g., https://fessor.vercel.app)
   - **Application privacy policy**: Your privacy policy URL
   - **Application terms of service**: Your terms URL
   - **Authorized domains**: Add your domain (e.g., vercel.app, your-domain.com)
   - **Developer contact information**: Your email

### Step 3: Configure OAuth 2.0 Client IDs

1. Still in Google Cloud Console
2. Go to **APIs & Services** → **Credentials**
3. You should see an OAuth 2.0 Client ID created automatically by Firebase
4. Click on the Web client ID
5. Add your authorized origins:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)
6. Add your authorized redirect URIs:
   - `http://localhost:3000/__/auth/handler` (for development)
   - `https://your-domain.com/__/auth/handler` (for production)
   - `https://your-project-id.firebaseapp.com/__/auth/handler`

## 🔐 Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Google Gemini AI (for reports generation)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxx

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Firebase Configuration Values

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click on your web app or create one if it doesn't exist
4. Copy the configuration values to your `.env.local` file

## 🧪 Testing Google Authentication

### Test Locally

1. Start the development server:
```bash
pnpm dev
```

2. Navigate to `http://localhost:3000/login`
3. Click "Entrar com Google"
4. You should see the Google OAuth popup
5. After successful authentication, you should be redirected to `/dashboard`

### Troubleshooting

#### Common Issues:

1. **"Popup blocked by browser"**
   - Solution: Allow popups for your localhost domain
   - Alternative: Use `signInWithRedirect` instead of `signInWithPopup`

2. **"redirect_uri_mismatch"**
   - Solution: Ensure your authorized redirect URIs in Google Cloud Console include your domain
   - Add: `https://your-project-id.firebaseapp.com/__/auth/handler`

3. **"origin_mismatch"**
   - Solution: Add your domain to authorized JavaScript origins
   - Add: `http://localhost:3000` for development

4. **"invalid_client"**
   - Solution: Check that OAuth consent screen is properly configured
   - Ensure the client ID matches between Firebase and Google Cloud Console

## 📱 Mobile Configuration (Future)

For mobile apps, you'll need to:

1. Add Android/iOS apps to your Firebase project
2. Download and add configuration files (google-services.json/GoogleService-Info.plist)
3. Configure OAuth 2.0 client IDs for mobile platforms

## 🔒 Security Best Practices

1. **Never expose API keys**: All sensitive keys should be server-side only
2. **Use HTTPS in production**: Google OAuth requires HTTPS
3. **Validate tokens server-side**: Always verify Firebase ID tokens on your backend
4. **Set up proper CORS**: Configure allowed origins properly
5. **Monitor usage**: Set up quotas and monitoring in Google Cloud Console

## 📊 Firebase Rules for User Data

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reports are owned by the creator
    match /reports/{reportId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    
    // Students can be read by authenticated users of the same school
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == resource.data.createdBy || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

## 🚀 Deployment Considerations

### Vercel Deployment
1. Add environment variables to your Vercel project settings
2. Ensure your production domain is added to authorized origins
3. Update redirect URIs to include your production domain

### Domain Configuration
1. Add your production domain to Firebase authorized domains:
   - Firebase Console → Authentication → Settings → Authorized domains
2. Update OAuth consent screen with production URLs
3. Test authentication on production environment

## 📈 Monitoring and Analytics

1. **Firebase Authentication**: Monitor sign-ins in Firebase Console
2. **Google Cloud Console**: Check OAuth usage and quotas
3. **Error Tracking**: Implement error tracking for authentication failures
4. **User Analytics**: Track user registration and login patterns

## 🆘 Support and Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firebase JavaScript SDK Reference](https://firebase.google.com/docs/reference/js)
- [Next.js Authentication Guide](https://nextjs.org/docs/authentication)

## 🔄 Updates and Maintenance

- Regularly update Firebase SDK and dependencies
- Monitor OAuth quota usage and upgrade if necessary
- Review and update privacy policy and terms of service
- Test authentication flow after any configuration changes