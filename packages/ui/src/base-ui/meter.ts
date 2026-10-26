import { Meter as BaseMeter } from '@base-ui/react/meter';
import { theme } from './styled.js';
import { gaugeStyles } from './progress.js';

/** Base UI Meter with the same Larch styles as Progress. Indicator adds a visual `tone` prop. */
export const Meter = theme(BaseMeter, 'Meter', gaugeStyles);
