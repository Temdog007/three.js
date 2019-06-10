import { Color } from '../math/Color.js';
import { Vector3 } from '../math/Vector3.js';
import { LightProbe } from './LightProbe.js';

export class HemisphereLightProbe extends LightProbe {
	constructor(skyColor?: Color | string | number, groundColor?: Color | string | number, intensity?: number);

	isHemisphereLightProbe: true;
}
