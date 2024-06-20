import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: '  ',
  appName: 'hotelsr',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      clientId: '122388841545-l5qkuqh82ov7rtbnmuuvj3mtev7a7gr7.apps.googleusercontent.com',
      serverClientId: '122388841545-l5qkuqh82ov7rtbnmuuvj3mtev7a7gr7.apps.googleusercontent.com',
      androidClientId: '122388841545-l5qkuqh82ov7rtbnmuuvj3mtev7a7gr7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
