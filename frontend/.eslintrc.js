module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    // 'prettier/react',
    // 'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    // ...
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['label'], // <label> 요소를 사용할 때
        labelAttributes: ['htmlFor'], // htmlFor 속성을 사용할 때
        controlComponents: ['input'], // <input> 요소를 사용할 때
        assert: 'either', // 라벨과 컨트롤 중 하나만 존재해도 허용
        depth: 3, // 최대 3단계 깊이의 DOM 구조 검사
      },
    ],
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
  },
}
