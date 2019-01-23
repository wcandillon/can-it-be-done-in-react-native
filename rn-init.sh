expo init $1
cd $1
yarn add typescript eslint eslint-config-react-native-wcandillon --dev
mv App.js App.tsx
curl -O https://gist.githubusercontent.com/wcandillon/10f40b913f1c63f357169b97473f9eb2/raw/1849ba09909274f4a080baa4b364590da0e54426/tsconfig.json
curl -O https://gist.githubusercontent.com/wcandillon/f734fb532bffec0abc436749dd46c4bf/raw/c33de2df4b4fb4dec0b6f44e6aa1ceb5d7004141/.eslintrc
curl -O https://raw.githubusercontent.com/slavovojacek/adbrain-typescript-definitions/master/webspeechapi/webspeechapi.d.ts 
#    "typecheck": "tsc",
#    "lint": "eslint App.tsx components/*"