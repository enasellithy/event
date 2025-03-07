### Installtion
- cd event_frontend
- npm install --legacy-peer-deps
-  npx expo start

## For Docker 
- Note Should run backend app first (see the README of the backend to follow the instructions) and also run mysql run 

### Run Docker
- need install docker 
- docker build -t react-native-app .
- docker run -p 9001:9001 react-native-app