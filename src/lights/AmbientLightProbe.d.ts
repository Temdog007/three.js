import { Color } from './../math/Color.js';
import { LightProbe } from './LightProbe.js';

export class AmbientLightProbe extends LightProbe {
	constructor( color?: Color | string | number, intensity?: number );
	isAmbientLightProbe: true;
}