/** @type {import('prettier').Config} */
const config = {
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
