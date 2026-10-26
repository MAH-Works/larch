import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { theme } from './styled.js';
import { listboxStyles } from './combobox.jsx';

/** Base UI Autocomplete with the same Larch styles as Combobox. */
export const Autocomplete = theme(BaseAutocomplete, 'Autocomplete', listboxStyles);
