## プロジェクト作成
```
yarn create next-app
```

## TypeScript
1. add tsconfig.json
```
cd <project root>
touch tsconfig.json
```

2. install TypeScript
```
yarn add --dev typescript @types/react @types/node
```

3. run（automatically written to tsconfig.json）
```
yarn dev
```

4. Rewrite all files in pages directory to .tsx

## MaterialUI導入
```
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## ソースディレクトリ設定
```
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/components/*": ["components/*"]
    },
    ...
  }
}
```

## .envファイル作成

## 状態管理 Redux Persist
```
yarn add redux react-redux redux-persist @reduxjs/toolkit
```

## バリデーション
```
yarn add react-hook-form
```