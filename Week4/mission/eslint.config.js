import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // React 관련 규칙
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 코드 품질을 위한 엄격한 규칙 추가
      'no-undef': 'error',                   // 정의되지 않은 변수 사용 금지
      'no-unused-vars': ['error', {          // 사용하지 않는 변수 금지
        'args': 'none',                      // 함수 인자는 제외
        'ignoreRestSiblings': true,
      }],
      'eqeqeq': ['error', 'always'],         // 엄격한 비교 연산자(===) 사용
      'curly': 'error',                      // 모든 제어문에 중괄호 사용 강제
      'consistent-return': 'error',          // 함수에서 일관된 반환값 사용
      'no-var': 'error',                     // var 사용 금지, let/const 사용 권장
      'prefer-const': 'error',               // 변경되지 않는 변수는 const 사용
      'object-shorthand': ['error', 'always'],    // 객체 속성 단축 표기법 사용
      'no-multi-assign': 'error',            // 여러 변수에 동시에 할당 금지
      'no-nested-ternary': 'error',          // 중첩 삼항 연산자 사용 금지
      'space-before-blocks': 'error',        // 코드 블록 앞에 공백 추가
      'indent': ['error', 2],                // 들여쓰기 2칸
      'array-bracket-spacing': ['error', 'never'], // 배열 대괄호 내부 공백 금지
      'no-useless-escape': 'off', // 불필요한 이스케이프 문자를 허용
    },
  },
];
