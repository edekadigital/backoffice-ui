[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# Backoffice UI

React components based on Material Design. [edekadigital.github.io/backoffice-ui](https://edekadigital.github.io/backoffice-ui/)

## Usage

### 1. Install

```bash
npm i -S @edekadigital/backoffice-ui
```

### 2. Load "Roboto" font

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
/>
```

### 3. Render `BackofficeUiProvider`

```js
import { BackofficeUiProvider } from '@edekadigital/backoffice-ui';

export const App = () => (
  <BackofficeUiProvider>
    <SomeComponent />
    {/* ... */}
  </BackofficeUiProvider>
);
```

### 4. Use components

```js
import { Button } from '@edekadigital/backoffice-ui';

export const SomeComponent = () => (
  <>
    {/* ... */}
    <Button>Some label</Button>
  </>
);
```

## Development

### Commands

| Command                    | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `npm run storybook`        | Start development mode (Storybook)                |
| `npm run build-storybook`  | Export storybook into a static web app            |
| `npm run build`            | Build library (cjs + es6)                         |
| `npm run test`, `npm test` | Run tests (TODO)                                  |
| `npm run check`            | Checks code for formatting and lint issues        |
| `npm run fix`              | Fixes formatting and linting issues (if possible) |
| `npm run clean`            | Removes all files generated by the build          |

### Test Ids

| Component                       | Test Ids                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `providers/SnackbarProvider`    | `snackbar-message`                                                                                                  |
| `components/AppBar`             | `appBar-title`                                                                                                      |
| `components/SearchField`        | `searchField-input`, `searchField-submit`                                                                           |
| `components/ConfirmationDialog` | `confirmationDialog-title`, `confirmationDialog-message`, `confirmationDialog-cancel`, `confirmationDialog-confirm` |
| `components/ContentGroup`       | `contentGroup-title`                                                                                                |
| `components/Switch`             | `switch-input`                                                                                                      |
| `components/TextField`          | `textField-input`                                                                                                   |
| `components/ReverseNavigation`  | `reverseNavigation-title`, `reverseNavigation-infoBar` , `reverseNavigation-actions`, `reverseNavigation-back`      |
| `components/TabNavigation`      | `tabNavigation-item`, `tabNavigation-item-${index}`                                                                 |
| `components/LogTable`           | `logTable-row-${index}`, `logTable-th-${index}`, `logTable-td-${rowIndex}-${index}`                                 |
| `form/FormFieldSet`             | `formFieldSet-title`                                                                                                |
| `form/FormRow`                  | `formRow-item-${index}`                                                                                             |
| `form/FormWrapper`              | `formWrapper-form`, `formWrapper-submit`, `formWrapper-cancel`                                                      |

### Resources

- [React](https://reactjs.org/)
- [Storybook](https://storybook.js.org/)

### Tests and test coverage

For all tests in this project we use the jest framework and set a minimum coverage of 90% for the subfolders 'components', 'layouts', 'forms' and 'typography'.
To run the tests locally, use the command:

```bash
npm run test
```

If the test coverage is below 90%, the tests will fail. To show a report of the test coverage in Google Chrome, use the command:

```bash
npm run show-coverage-report
```
